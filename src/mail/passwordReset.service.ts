import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class PasswordResetService {
  constructor(private config: ConfigService) {}
  async sendPasswordResetEmail(email: string, token: string) {
    sgMail.setApiKey(this.config.get('SEND_GRID_API_KEY'));

    const msg = {
      to: email,
      from: {
        name: 'Password Reset',
        email: 'password_reset@weplugmusic.com',
      },
      templateId: this.config.get('PASSWORD_RESET_TEMPLATE_ID'),
      dynamicTemplateData: {
        resetLink: `${this.config.get('CLIENT_URL')}/password-reset/${token}`,
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
