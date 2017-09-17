import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { CharactersModule } from '../../character/character.module';
import { KillmailParticipantService } from './participant.service';
import { killmailParticipantProviders } from './participant.providers';

@Module({
  modules: [
    DatabaseModule,
    CharactersModule,
  ],
  controllers: [],
  components: [
    ...killmailParticipantProviders,
    KillmailParticipantService,
  ],
  exports: [
    KillmailParticipantService,
  ],
})
export class KillmailParticipantModule {
}
