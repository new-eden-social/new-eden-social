import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../core/database/database.module';
import { CharacterModule } from '../../character/character.module';
import { KillmailParticipantService } from './participant.service';
import { killmailParticipantProviders } from './participant.providers';
import { UniverseTypeModule } from '../../universe/type/type.module';

@Module({
  imports: [
    DatabaseModule,
    CharacterModule,
    UniverseTypeModule,
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
