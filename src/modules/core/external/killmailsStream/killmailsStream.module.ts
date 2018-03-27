import { Module } from '@nestjs/common';
import { KillmailsStreamService } from './killmailsStream.service';

@Module({
  imports: [],
  components: [
    KillmailsStreamService,
  ],
  exports: [
    KillmailsStreamService,
  ],
})
export class KillmailsStreamModule {
}
