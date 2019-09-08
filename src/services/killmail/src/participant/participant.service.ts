import { Injectable } from '@nestjs/common';
import { KillmailParticipant } from './participant.entity';
import { KillmailParticipantRepository } from './participant.repository';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IKillmailAttacker,
  TKillmailParticipant,
  IKillmailVictim,
} from '@new-eden-social/zkillboard';

@Injectable()
export class KillmailParticipantService {

  constructor(
    @InjectRepository(KillmailParticipantRepository)
    private readonly killmailParticipantRepository: KillmailParticipantRepository,
  ) {
  }

  /**
   *
   * @param {TKillmailStreamParticipant} data
   * @param {"attacker" | "victim"} type
   * @return {Promise<KillmailParticipant>}
   */
  public async create(
    data: TKillmailParticipant,
    type: 'attacker' | 'victim',
  ): Promise<KillmailParticipant> {
    const participant = new KillmailParticipant();

    if (type === 'attacker') {
      participant.damageDone = (data as IKillmailAttacker).damageDone;
      participant.weaponId = (data as IKillmailAttacker).weaponId;
      participant.finalBlow = (data as IKillmailAttacker).finalBlow;
    } else if (type === 'victim') {
      participant.damageTaken = (data as IKillmailVictim).damageTaken;
    }

    participant.type = type;
    participant.characterId = data.id;
    participant.shipId = data.shipId;

    return this.killmailParticipantRepository.save(participant);
  }

}
