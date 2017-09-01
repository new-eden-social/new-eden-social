import { Component } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DatabaseService } from '../../../database/database.service';
import { KillmailParticipant } from './participant.entity';
import {
  IKillmailStreamAttacker,
  IKillmailStreamVictim, TKillmailStreamParticipant,
} from '../../../external/killmailsStream/killmailsStream.interface';

@Component()
export class KillmailParticipantService {

  constructor(private databaseService: DatabaseService) {
  }

  private get repository(): Promise<Repository<KillmailParticipant>> {
    return this.databaseService.getRepository(KillmailParticipant);
  }

  public async create(data: TKillmailStreamParticipant, type: 'attacker' | 'victim'): Promise<KillmailParticipant> {
    const participant = new KillmailParticipant();

    if (type === 'attacker') {
      participant.damageDone = (<IKillmailStreamAttacker>data).damageDone;
      participant.weaponId = (<IKillmailStreamAttacker>data).weaponId;
      participant.finalBlow = (<IKillmailStreamAttacker>data).finalBlow;
    } else if (type === 'victim') {
      participant.damageTaken = (<IKillmailStreamVictim>data).damageTaken;
    }

    participant.type = type;
    participant.shipId = data.shipId;

    return (await this.repository).persist(participant);
  }

}
