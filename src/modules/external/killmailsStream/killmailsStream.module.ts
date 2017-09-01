import { Module, Shared } from '@nestjs/common';
import { KillmailsStreamService } from './killmailsStream.service';

@Shared()
@Module({
  modules: [
  ],
  components: [
    KillmailsStreamService,
  ],
  exports: [
    KillmailsStreamService,
  ],
})
export class KillmailsStreamModule {
}
