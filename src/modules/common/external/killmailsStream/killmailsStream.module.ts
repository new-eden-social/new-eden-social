import { Module } from '@nestjs/common';
import { KillmailsStreamService } from './killmailsStream.service';

@Module({
  modules: [],
  components: [
    KillmailsStreamService,
  ],
  exports: [
    KillmailsStreamService,
  ],
})
export class KillmailsStreamModule {
}
