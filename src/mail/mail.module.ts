import { Global, Module } from '@nestjs/common';
import { PasswordResetService } from './passwordReset.service';
import { VerifyEmailService } from './verifyEmail.service';
import { MusicReleaseService } from './musicRelease.service';
import { NotificationService } from './notification.service';

@Global()
@Module({
  providers: [
    PasswordResetService,
    VerifyEmailService,
    MusicReleaseService,
    NotificationService,
  ],
  exports: [
    PasswordResetService,
    VerifyEmailService,
    MusicReleaseService,
    NotificationService,
  ],
})
export class MailModule {}
