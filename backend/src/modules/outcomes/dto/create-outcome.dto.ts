import { IsString, IsNotEmpty, IsNumber, IsOptional, IsEnum } from 'class-validator';

export enum OutcomeType {
  PURCHASE = 'purchase',
  BOUNCE = 'bounce',
  NO_ACTION = 'no_action',
  CART_ABANDONED = 'cart_abandoned',
}

export class CreateOutcomeDto {
  @IsString()
  @IsNotEmpty()
  store_id!: string;

  @IsString()
  @IsNotEmpty()
  session_id!: string;

  @IsEnum(OutcomeType)
  @IsNotEmpty()
  outcome!: OutcomeType;

  @IsString()
  @IsOptional()
  action_shown?: string;

  @IsNumber()
  @IsOptional()
  revenue?: number;

  @IsString()
  @IsOptional()
  order_id?: string;
}