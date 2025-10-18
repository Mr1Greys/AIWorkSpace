import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

// Common modules
import { PrismaModule } from './common/prisma/prisma.module';
import { LoggerModule } from './common/logger/logger.module';

// Feature modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { BriefsModule } from './modules/briefs/briefs.module';
import { MatchingModule } from './modules/matching/matching.module';
import { CasesModule } from './modules/cases/cases.module';
import { ChatModule } from './modules/chat/chat.module';
import { EscrowModule } from './modules/escrow/escrow.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    // Rate limiting
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),

    // Common modules
    PrismaModule,
    LoggerModule,

    // Feature modules
    AuthModule,
    UsersModule,
    BriefsModule,
    MatchingModule,
    CasesModule,
    ChatModule,
    EscrowModule,
    NotificationsModule,
    UploadModule,
  ],
})
export class AppModule {}
