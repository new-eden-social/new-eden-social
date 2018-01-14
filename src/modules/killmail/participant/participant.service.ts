import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { KillmailParticipant } from './participant.entity';
import {
  IKillmailStreamAttacker,
  IKillmailStreamVictim,
  TKillmailStreamParticipant,
} from '../../common/external/killmailsStream/killmailsStream.interface';
import { CharacterService } from '../../character/character.service';
import { KILLMAIL_PARTICIPANT_REPOSITORY_TOKEN } from './participant.constants';

@Component()
export class KillmailParticipantService {

  constructor(
    @Inject(KILLMAIL_PARTICIPANT_REPOSITORY_TOKEN)
    private killmailParticipantRepository: Repository<KillmailParticipant>,
    private charactersService: CharacterService,
  ) {
  }

  /**
   *
   * @param {KillmailsStream.TKillmailStreamParticipant} data
   * @param {"attacker" | "victim"} type
   * @return {Promise<KillmailParticipant>}
   */
  public async create(
    data: TKillmailStreamParticipant,
    type: 'attacker' | 'victim',
  ): Promise<KillmailParticipant> {
    const participant = new KillmailParticipant();

    if (type === 'attacker') {
      participant.damageDone = (<IKillmailStreamAttacker>data).damageDone;
      participant.weaponId = (<IKillmailStreamAttacker>data).weaponId;
      participant.finalBlow = (<IKillmailStreamAttacker>data).finalBlow;
    } else if (type === 'victim') {
      participant.damageTaken = (<IKillmailStreamVictim>data).damageTaken;
    }

    participant.type = type;
    participant.character = await this.charactersService.get(data.id);
    participant.shipId = data.shipId;

    return this.killmailParticipantRepository.save(participant);
  }

}
