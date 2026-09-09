import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4, { message: 'Name must be at least 4 characters long' })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: 'Store URL is required' })
  store_url!: string;

  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty()
  email!: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password!: string;

  @IsString()
  @IsNotEmpty({ message: 'WhatsApp number is required' })
  whatsapp_number!: string;
}

