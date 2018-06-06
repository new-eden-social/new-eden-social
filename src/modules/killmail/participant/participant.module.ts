import { Module } from '@nestjs/common';
import { CharacterModule } from '../../character/character.module';
import { KillmailParticipantService } from './participant.service';
import { UniverseTypeModule } from '../../universe/type/type.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KillmailParticipantRepository } from './participant.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([KillmailParticipantRepository]),

    CharacterModule,
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
