import { Controller, Post, Body, Get } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
@Controller('ingestion')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  @Post('event')
  async captureEvent(@Body() body: any) {
    return await this.ingestionService.handleIncomingEvents(body);
  }

  @Get('health')
  getHealth() {
    return { status: 'ok' };
  }
}
