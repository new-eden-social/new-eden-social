import { Module, forwardRef } from '@nestjs/common';
import { CharacterModule } from '../@new-eden-social/api-character/character.module';
import { KillmailParticipantService } from './participant.service';
import { UniverseTypeModule } from '../../universe/type/type.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KillmailParticipantRepository } from './participant.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([KillmailParticipantRepository]),

    forwardRef(() => CharacterModule),
    UniverseTypeModule,
  ],
  controllers: [],
  providers: [
    KillmailParticipantService,
  ],
  exports: [
    KillmailParticipantService,
  ],
})
export class KillmailParticipantModule {
}
