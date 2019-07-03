import { Module, forwardRef } from '@nestjs/common';
import { MetascraperService } from './metascraper.service';
import { MetascraperController } from './metascraper.controller';
import { KillmailModule } from '../killmail/killmail.module';
import { LoggerModule } from '@new-eden-social/logger';
import { UtilsModule } from '@new-eden-social/utils';

@Module({
  imports: [
    LoggerModule,
    UtilsModule,
    forwardRef(() => KillmailModule),
  ],
  providers: [
    MetascraperService,
  ],
  exports: [
    MetascraperService,
  ],
  controllers: [
    MetascraperController,
  ],
})
export class MetascraperModule {
}
