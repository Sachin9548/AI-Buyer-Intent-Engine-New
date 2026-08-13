import { IsString, IsNotEmpty, IsEmail, IsUrl, IsOptional, IsObject } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @IsNotEmpty()
  store_id!: string; // e.g. "wa-automation"

  @IsString()
  @IsNotEmpty()
  store_name!: string;

  @IsUrl()
  @IsNotEmpty()
  store_url!: string;

  @IsEmail()
  @IsNotEmpty()
  owner_email!: string;

  @IsObject()
  @IsOptional()
  config?: Record<string, any>;
}