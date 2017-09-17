import { Component } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DatabaseService } from '../../database/database.service';
import { KillmailParticipant } from './participant.entity';
import {
  IKillmailStreamAttacker,
  IKillmailStreamVictim,
  TKillmailStreamParticipant,
} from '../../external/killmailsStream/killmailsStream.interface';
import { CharactersService } from '../../character/character.service';
import { IParticipantResponse } from './participant.interface';

@Component()
export class KillmailParticipantService {

  constructor(
    private databaseService: DatabaseService,
    private charactersService: CharactersService,
  ) {
  }

  private get repository(): Promise<Repository<KillmailParticipant>> {
    return this.databaseService.getRepository(KillmailParticipant);
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

    return (await this.repository).persist(participant);
  }

  /**
   * Format Participant Response
   * @param {KillmailParticipant} participant
   * @return {Promise<IParticipantResponse>}
   */
  public async formatParticipantResponse(
    participant: KillmailParticipant,
  ): Promise<IParticipantResponse> {
    const character = await this.charactersService.get(participant.character.id);

    return {
      character,
      shipId: participant.shipId,
      weaponId: participant.weaponId,
      damageDone: participant.damageDone,
      damageTaken: participant.damageTaken,
      finalBlow: participant.finalBlow,
    };
  }

}
