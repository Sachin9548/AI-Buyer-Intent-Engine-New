import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    // Check if SMTP credentials exist in .env
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_PORT === '465', // true for 465, false for 587
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      this.logger.log('📧 SMTP Mailer initialized successfully');
    } else {
      this.logger.warn('⚠️ SMTP credentials not found in .env. Falling back to Console Logger for OTPs.');
    }
  }

  // Send 6-digit OTP Email
  async sendOtpEmail(email: string, otp: string, name: string): Promise<boolean> {
    const fromAddress = process.env.SMTP_FROM || '"Claarvia BIME" <no-reply@claarvia.com>';
    const subject = `${otp} is your Claarvia verification code`;

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 500px; margin: 0 auto; padding: 24px; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0;">
        <div style="margin-bottom: 20px;">
          <h2 style="color: #0f172a; margin: 0; font-size: 20px;">Welcome to Claarvia, ${name}!</h2>
          <p style="color: #64748b; font-size: 14px; margin-top: 6px;">Please use the verification code below to activate your merchant account.</p>
        </div>
        
        <div style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 18px; text-align: center; margin: 24px 0;">
          <span style="font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #4f46e5;">${otp}</span>
          <p style="color: #94a3b8; font-size: 12px; margin-top: 8px; margin-bottom: 0;">Code expires in 10 minutes</p>
        </div>

        <p style="color: #64748b; font-size: 13px; line-height: 1.5;">If you did not sign up for a Claarvia account, please ignore this email.</p>
        
        <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 20px 0;" />
        <p style="color: #94a3b8; font-size: 11px; text-align: center; margin: 0;">Claarvia BIME &copy; Autonomous Buyer Intent Engine</p>
      </div>
    `;

    // 1. Try sending real email if SMTP is configured
    if (this.transporter) {
      try {
        await this.transporter.sendMail({
          from: fromAddress,
          to: email,
          subject: subject,
          html: htmlContent,
        });
        this.logger.log(`✅ Verification OTP sent successfully to: ${email}`);
        return true;
      } catch (error) {
        this.logger.error(`❌ Failed to send SMTP email to ${email}:`, error);
        // Fallback to console so dev flow is not blocked
      }
    }

    // 2. DEV Fallback: Print in terminal
    console.log(`\n======================================================`);
    console.log(`📬 [DEV MAIL FALLBACK] To: ${email} | Name: ${name}`);
    console.log(`🔑 Verification OTP: >>> ${otp} <<< (Expires in 10 mins)`);
    console.log(`======================================================\n`);

    return true;
  }
}