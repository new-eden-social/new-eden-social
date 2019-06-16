import { Module, forwardRef } from '@nestjs/common';
import { MetascraperService } from './metascraper.service';
import { MetascraperController } from './metascraper.controller';
import { KillmailModule } from '../killmail/killmail.module';

@Module({
  imports: [
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
