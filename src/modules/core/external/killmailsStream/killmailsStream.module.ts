import { Module } from '@nestjs/common';
import { KillmailsStreamService } from './killmailsStream.service';

@Module({
  imports: [],
  providers: [
    KillmailsStreamService,
  ],
  exports: [
    KillmailsStreamService,
  ],
})
export class KillmailsStreamModule {
}
