// src/app.module.ts
import { Module } from '@nestjs/common';
import { IngestionModule } from './modules/ingestion/ingestion.module';
@Module({
  imports: [IngestionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
