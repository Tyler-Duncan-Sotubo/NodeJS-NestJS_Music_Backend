import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class NotificationService {
  constructor(private config: ConfigService) {}
  async sendMusicReleaseEmail() {
    sgMail.setApiKey(this.config.get('SEND_GRID_API_KEY'));

    const msg = {
      to: 'tylertooxclusive@gmail.com',
      from: {
        name: 'Music Release Notification',
        email: 'noreply@weplugmusic.com',
      },
      templateId: this.config.get('RELEASE_NOTIFICATION_TEMPLATE_ID'),
    };

    (async () => {
      try {
        await sgMail.send(msg);
      } catch (error) {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
      }
    })();
  }
}
