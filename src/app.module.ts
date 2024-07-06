import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { MusicModule } from './music/music.module';
import { StripeModule } from './stripe/stripe.module';
import { PaypalModule } from './paypal/paypal.module';
import { SmartlinksModule } from './smartlinks/smartlinks.module';
import { StreamsModule } from './streams/streams.module';
import { AdminModule } from './admin/admin.module';
import { LabelModule } from './label/label.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    MailModule,
    MusicModule,
    StripeModule,
    PaypalModule,
    SmartlinksModule,
    StreamsModule,
    AdminModule,
    LabelModule,
  ],
})
export class AppModule {}
