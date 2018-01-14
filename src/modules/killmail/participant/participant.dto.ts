import { DCharacterShort } from '../../character/character.dto';
import { KillmailParticipant } from './participant.entity';

export class DParticipantShort {
  character: DCharacterShort;
  type: 'attacker' | 'victim';
  shipId?: number; // TODO: Return ship details
  damageDone?: number;
  finalBlow?: boolean;
  weaponId?: number; // TODO: Return weapon details
  damageTaken?: number;

  constructor(participant: KillmailParticipant) {
    this.character = new DCharacterShort(participant.character);
    this.type = participant.type;
    this.shipId = participant.shipId;
    this.damageDone = participant.damageDone;
    this.finalBlow = participant.finalBlow;
    this.weaponId = participant.weaponId;
    this.damageTaken = participant.damageTaken;
  }
}
