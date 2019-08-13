import { Injectable, Inject } from '@nestjs/common';
import { KillmailParticipant } from './participant.entity';
import { CharacterService } from '../@new-eden-social/api-character';
import { UniverseTypeService } from '../../universe/type/type.service';
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
    private readonly charactersService: CharacterService,
    private readonly universeTypeService: UniverseTypeService,
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
      participant.weapon = await this.universeTypeService.get(
        (data as IKillmailAttacker).weaponId);
      participant.finalBlow = (data as IKillmailAttacker).finalBlow;
    } else if (type === 'victim') {
      participant.damageTaken = (data as IKillmailVictim).damageTaken;
    }

    participant.type = type;
    participant.character = await this.charactersService.get(data.id);
    participant.ship = await this.universeTypeService.get(data.shipId);

    return this.killmailParticipantRepository.save(participant);
  }

}
