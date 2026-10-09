import { Controller, Post, Body, Get } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { IngestionService } from './ingestion.service';

@Controller('ingestion')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}
  @Throttle({ default: { limit: 200, ttl: 60000 } })
  @Post('event')
  async captureEvent(@Body() body: any) {
    return await this.ingestionService.handleIncomingEvents(body);
  }

  @Get('health')
  getHealth() {
    return { status: 'ok' };
  }
}
