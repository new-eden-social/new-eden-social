import { Module } from '@nestjs/common';
import { KillmailsStreamService } from './killmailsStream.service';
import { ZKillboardModule } from '../zkillboard/zkillboard.module';

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
