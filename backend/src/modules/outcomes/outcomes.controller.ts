import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { OutcomesService } from './outcomes.service';
import { CreateOutcomeDto } from './dto/create-outcome.dto';

@Controller('outcomes')
export class OutcomesController {
  constructor(private readonly outcomesService: OutcomesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async trackOutcome(@Body() dto: CreateOutcomeDto) {
    return await this.outcomesService.recordOutcome(dto);
  }
}