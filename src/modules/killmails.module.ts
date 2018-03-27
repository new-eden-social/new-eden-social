import { Module } from '@nestjs/common';
import { LoggerModule } from './core/logger/logger.module';
import { UtilsModule } from './core/utils/utils.module';
import { KillmailModule } from './killmail/killmail.module';

@Module({
  imports: [
    // Global
    LoggerModule,
    UtilsModule,

    KillmailModule,
  ],
})
export class KillmailsModule {
}
