import { MiddlewaresConsumer, Module, RequestMethod, Shared } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { DatabaseConfig } from '../../database/database.config';
import { CharactersModule } from '../../character/character.module';
import { KillmailsStreamModule } from '../../external/killmailsStream/killmailsStream.module';
import { KillmailService } from './killmail.service';
import { KillmailParticipantModule } from './participant/participant.module';

@Shared()
@Module({
  modules: [
    DatabaseModule,
    CharactersModule,
    KillmailsStreamModule,
    KillmailParticipantModule,
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
