import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'claarvia_production_jwt_secret_key_2026_secure',
    });
  }

  async validate(payload: { email: string; name: string; store_url: string }) {
    const user = await this.usersService.findByEmail(payload.email);
    if (!user || !user.is_verified) {
      throw new UnauthorizedException('Merchant account does not exist or is unverified.');
    }
    // Yeh request.user ke andar attach ho jayega
    return {
      email: user.email,
      userId: user.user_id, 
      name: user.name,
      store_url: user.store_url,
      whatsapp_number: user.whatsapp_number,
    };
  }
}