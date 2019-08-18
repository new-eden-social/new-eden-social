import { Module, forwardRef } from '@nestjs/common';
import { KillmailParticipantService } from './participant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KillmailParticipantRepository } from './participant.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([KillmailParticipantRepository]),
  ],
  providers: [
    KillmailParticipantService,
  ],
  exports: [
    KillmailParticipantService,
  ],
})
export class KillmailParticipantModule {
}
