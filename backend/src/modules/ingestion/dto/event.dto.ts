import { IsString, IsNotEmpty, IsObject, IsOptional } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  store_id!: string;

  @IsString()
  @IsNotEmpty()
  event_type!: string;

  @IsObject()
  @IsOptional()
  metadata!: Record<string, any>;
  
  @IsString()
  @IsNotEmpty()
  timestamp!: string;
}