// src/app.module.ts
import { Module } from '@nestjs/common';
// Core Engine Tracking related modules
import { IngestionModule } from './modules/ingestion/ingestion.module';
import { OutcomesModule } from './modules/outcomes/outcomes.module';
import { StoresModule } from './modules/stores/stores.module';
// Auth Login and Signup related modules
import { UsersModule } from './modules/users/users.module';
import { MailModule } from './modules/mail/mail.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    IngestionModule,
    OutcomesModule,
    StoresModule,
    UsersModule,
    MailModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
