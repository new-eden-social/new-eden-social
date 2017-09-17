import { MiddlewaresConsumer, Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { KillmailsStreamModule } from '../external/killmailsStream/killmailsStream.module';
import { KillmailService } from './killmail.service';
import { KillmailParticipantModule } from './participant/participant.module';
import { PostModule } from '../post/post.module';
import { killmailProviders } from './killmail.providers';

@Module({
  modules: [
    DatabaseModule,
    KillmailsStreamModule,
    KillmailParticipantModule,
    PostModule,
  ],
  controllers: [],
  components: [
    ...killmailProviders,
    KillmailService,
  ],
  exports: [
    KillmailService,
  ],
})
export class KillmailModule {
}
