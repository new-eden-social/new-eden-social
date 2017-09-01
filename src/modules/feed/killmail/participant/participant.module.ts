import { MiddlewaresConsumer, Module, RequestMethod, Shared } from '@nestjs/common';
import { DatabaseModule } from '../../../database/database.module';
import { CharactersModule } from '../../../character/character.module';
import { KillmailParticipantService } from './participant.service';

@Module({
  modules: [
    DatabaseModule,
    CharactersModule,
  ],
  controllers: [],
  components: [
    KillmailParticipantService,
  ],
  exports: [
    KillmailParticipantService,
  ],
})
export class KillmailParticipantModule {
}
