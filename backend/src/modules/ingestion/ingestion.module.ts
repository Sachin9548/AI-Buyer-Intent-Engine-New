import { Module } from '@nestjs/common';
import { IngestionController } from './ingestion.controller';
import { IngestionService } from './ingestion.service';
import Redis from 'ioredis/built/Redis';


@Module({
  controllers: [IngestionController], 
  providers: [IngestionService],      
})
export class IngestionModule {}