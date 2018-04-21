import { MiddlewaresConsumer, Module } from '@nestjs/common';
import { DatabaseModule } from '../core/database/database.module';
import { KillmailsStreamModule } from '../core/external/killmailsStream/killmailsStream.module';
import { KillmailService } from './killmail.service';
import { KillmailParticipantModule } from './participant/participant.module';
import { PostModule } from '../post/post.module';
import { killmailProviders } from './killmail.providers';

@Module({
  imports: [
    DatabaseModule,
    KillmailsStreamModule,
    KillmailParticipantModule,
    PostModule,
  ],
  controllers: [],
  providers: [
    ...killmailProviders,
    KillmailService,
  ],
  exports: [
    KillmailService,
  ],
})
export class KillmailModule {
}
