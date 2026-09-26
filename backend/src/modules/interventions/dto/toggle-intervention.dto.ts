import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class ToggleInterventionDto {
  @IsBoolean()
  @IsNotEmpty()
  active!: boolean;

  @IsString()
  @IsOptional()
  discount_code?: string;

  @IsNumber()
  @IsOptional()
  discount_pct?: number;
}