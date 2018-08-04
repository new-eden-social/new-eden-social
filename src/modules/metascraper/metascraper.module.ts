import { Module } from '@nestjs/common';
import { MetascraperService } from './metascraper.service';
import { MetascraperController } from './metascraper.controller';
import { KillmailModule } from '../killmail/killmail.module';

@Module({
  imports: [
    KillmailModule,
  ],
  providers: [
    MetascraperService,
  ],
  controllers: [
    MetascraperController,
  ]
})
export class MetascraperModule {
}
