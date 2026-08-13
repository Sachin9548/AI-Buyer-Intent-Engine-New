import { Module } from '@nestjs/common';
import { IngestionController } from './ingestion.controller';
import { IngestionService } from './ingestion.service';
import { FeatureEngineeringService } from './feature-engineering.service';
import { RuleEngineService } from './rule-engine.service';

@Module({
  controllers: [IngestionController],
  providers: [IngestionService, FeatureEngineeringService, RuleEngineService],
})
export class IngestionModule {}
