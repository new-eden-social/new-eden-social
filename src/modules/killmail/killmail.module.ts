import { MiddlewaresConsumer, Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { KillmailsStreamModule } from '../external/killmailsStream/killmailsStream.module';
import { KillmailService } from './killmail.service';
import { KillmailParticipantModule } from './participant/participant.module';
import { PostModule } from '../post/post.module';

@Module({
  modules: [
    DatabaseModule,
    KillmailsStreamModule,
    KillmailParticipantModule,
    PostModule,
  ],
  controllers: [],
  components: [
    KillmailService,
  ],
  exports: [
    KillmailService,
  ],
})
export class KillmailModule {
}
