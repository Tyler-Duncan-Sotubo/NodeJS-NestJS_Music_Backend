import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class VerifyEmailService {
  constructor(private config: ConfigService) {}
  async sendVerifyEmail(email: string, token: string, name: string) {
    sgMail.setApiKey(this.config.get('SEND_GRID_API_KEY'));

    const msg = {
      to: email,
      from: {
        name: 'Verify Email',
        email: 'welcome@weplugmusic.com',
      },
      templateId: this.config.get('VERIFY_EMAIL_TEMPLATE_ID'),
      dynamicTemplateData: {
        name: name,
        verifyLink: `${this.config.get('SERVER_URL')}/auth/verify/${token}`,
      },
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
