// src/app.module.ts
import { Module } from '@nestjs/common';
// Production Hardning
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

// Core Engine Tracking related modules
import { IngestionModule } from './modules/ingestion/ingestion.module';
import { OutcomesModule } from './modules/outcomes/outcomes.module';
import { StoresModule } from './modules/stores/stores.module';
// Auth Login and Signup related modules
import { UsersModule } from './modules/users/users.module';
import { MailModule } from './modules/mail/mail.module';
import { AuthModule } from './modules/auth/auth.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { InterventionsModule } from './modules/interventions/interventions.module';
// Dashboard related Module

@Module({
  imports: [
    // 🛡️ Global Rate Limiting: Default 60 requests per minute

    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute in milliseconds
        limit: 100, // Max 100 requests per minute
      },
    ]),
    IngestionModule,
    OutcomesModule,
    StoresModule,
    UsersModule,
    MailModule,
    AuthModule,
    DashboardModule,
    InterventionsModule,
  ],
  controllers: [],
  providers: [
    // Global Throttler Guard
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
