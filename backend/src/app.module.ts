// src/app.module.ts
import { Module } from '@nestjs/common';
import { IngestionModule } from './modules/ingestion/ingestion.module';
import { OutcomesModule } from './modules/outcomes/outcomes.module';
import { StoresModule } from './modules/stores/stores.module';
@Module({
  imports: [IngestionModule, OutcomesModule, StoresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
