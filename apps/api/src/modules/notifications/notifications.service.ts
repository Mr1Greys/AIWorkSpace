import { Injectable } from '@nestjs/common';
import { Logger } from '@/common/logger/logger.service';

@Injectable()
export class NotificationsService {
  constructor(private logger: Logger) {}

  async sendEmail(to: string, subject: string, body: string) {
    // TODO: Implement email sending with Nodemailer
    this.logger.log(`Email sent to ${to}: ${subject}`, 'Notifications');
  }

  async sendPush(userId: string, title: string, body: string) {
    // TODO: Implement push notifications with Firebase
    this.logger.log(`Push sent to ${userId}: ${title}`, 'Notifications');
  }
}
