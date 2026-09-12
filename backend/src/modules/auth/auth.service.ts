 import {
  Injectable,
  ConflictException,
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import redis from '../../config/redis.config';
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';
import { SignupDto } from './dto/signup.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  // 1. SIGNUP: Hash Password -> Save to DB (unverified) -> Generate & Store OTP in Redis -> Send Email
  async signup(dto: SignupDto) {
    const email = dto.email.toLowerCase().trim();

    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser && existingUser.is_verified) {
      throw new ConflictException('A merchant account with this email already exists.');
    }

    // Hash Password using bcrypt (10 salt rounds)
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(dto.password, salt);

    // Save or update user in DynamoDB (is_verified = false)
    await this.usersService.createUser({
      email,
      name: dto.name,
      store_url: dto.store_url,
      password_hash: passwordHash,
      whatsapp_number: dto.whatsapp_number,
    });

    // Generate Secure 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP in Redis (10 mins TTL = 600s)
    const redisOtpKey = `otp:${email}`;
    await redis.set(redisOtpKey, otp, 'EX', 600);

    // Send Verification Email
    await this.mailService.sendOtpEmail(email, otp, dto.name);

    return {
      success: true,
      message: 'Verification code sent to your email. Please verify within 10 minutes.',
      email,
    };
  }

  // 2. VERIFY OTP: Match Redis OTP -> Update DB is_verified: true -> Delete Redis OTP
  async verifyOtp(dto: VerifyOtpDto) {
    const email = dto.email.toLowerCase().trim();
    const redisOtpKey = `otp:${email}`;

    // Fetch OTP from Redis
    const cachedOtp = await redis.get(redisOtpKey);
    if (!cachedOtp) {
      throw new BadRequestException('OTP has expired or was not requested. Please request a new code.');
    }

    if (cachedOtp !== dto.otp.trim()) {
      throw new BadRequestException('Invalid verification code. Please check and try again.');
    }

    // Delete OTP from Redis so it cannot be reused
    await redis.del(redisOtpKey);

    // Mark user as verified in DynamoDB
    await this.usersService.markAsVerified(email);

    // Fetch verified user details
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new InternalServerErrorException('User record not found after verification.');
    }

    // Issue initial JWT Token upon successful verification (Seamless UX)
    const payload = {sub: user.user_id, email: user.email, name: user.name, store_url: user.store_url };
    const accessToken = this.jwtService.sign(payload);

    return {
      success: true,
      message: 'Account verified successfully! Welcome to Claarvia.',
      access_token: accessToken,
      user: {
        email: user.email,
        name: user.name,
        store_url: user.store_url,
      },
    };
  }

  // 3. LOGIN: Validate credentials -> Check is_verified -> Return JWT Token
  async login(dto: LoginDto) {
    const email = dto.email.toLowerCase().trim();

    // Find User
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    // Enforce email verification
    if (!user.is_verified) {
      throw new UnauthorizedException('Your account is not verified yet. Please verify your email first.');
    }

    // Compare bcrypt password hash
    const isPasswordValid = await bcrypt.compare(dto.password, user.password_hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    // Generate Signed JWT Token
    const payload = { email: user.email, name: user.name, store_url: user.store_url };
    const accessToken = this.jwtService.sign(payload);

    return {
      success: true,
      message: 'Logged in successfully.',
      access_token: accessToken,
      user: {
        email: user.email,
        name: user.name,
        store_url: user.store_url,
        whatsapp_number: user.whatsapp_number,
      },
    };
  }
}