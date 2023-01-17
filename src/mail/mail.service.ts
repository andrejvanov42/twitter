import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendVerificationCode(to: string, emailCode: string): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to,
        subject: 'Your verification code !',
        context: {
          emailCode,
        },
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
