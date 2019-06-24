import { Module } from '@nestjs/common';
import { KillmailsStreamService } from './killmails-stream.service';
import { ZKillboardModule } from '@new-eden-social/zkillboard';

@Module({
  imports: [
    ZKillboardModule,
  ],
  providers: [
    KillmailsStreamService,
  ],
  exports: [
    KillmailsStreamService,
  ],
})
export class KillmailsStreamModule {
}
