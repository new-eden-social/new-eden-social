import { Injectable, Inject } from '@nestjs/common';
import { KillmailParticipant } from './participant.entity';
import { CharacterService } from '../../character/character.service';
import { UniverseTypeService } from '../../universe/type/type.service';
import { KillmailParticipantRepository } from './participant.repository';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IKillmailAttacker,
  TKillmailParticipant,
  IKillmailVictim,
} from '../../core/external/zkillboard/zkillboard.interface';

@Injectable()
export class KillmailParticipantService {

  constructor(
    private charactersService: CharacterService,
    private universeTypeService: UniverseTypeService,
    @InjectRepository(KillmailParticipantRepository)
    private killmailParticipantRepository: KillmailParticipantRepository,
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
      participant.damageDone = (<IKillmailAttacker>data).damageDone;
      participant.weapon = await this.universeTypeService.get(
        (<IKillmailAttacker>data).weaponId);
      participant.finalBlow = (<IKillmailAttacker>data).finalBlow;
    } else if (type === 'victim') {
      participant.damageTaken = (<IKillmailVictim>data).damageTaken;
    }

    participant.type = type;
    participant.character = await this.charactersService.get(data.id);
    participant.ship = await this.universeTypeService.get(data.shipId);

    return this.killmailParticipantRepository.save(participant);
  }

}
