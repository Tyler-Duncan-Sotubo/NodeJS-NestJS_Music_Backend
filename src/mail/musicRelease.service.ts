import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class MusicReleaseService {
  constructor(private config: ConfigService) {}
  async sendMusicReleaseEmail(email: string, artist: string) {
    sgMail.setApiKey(this.config.get('SEND_GRID_API_KEY'));

    const msg = {
      to: email,
      from: {
        name: 'Your Music release',
        email: 'noreply@weplugmusic.com',
      },
      templateId: this.config.get('MUSIC_RELEASE_TEMPLATE_ID'),
      dynamicTemplateData: {
        artist: artist,
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
