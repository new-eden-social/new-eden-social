import { DCharacterShort } from '../../character/character.dto';
import { KillmailParticipant } from './participant.entity';
import { DUniverseType } from '../../universe/type/type.dto';

export class DParticipantShort {
  character: DCharacterShort;
  type: 'attacker' | 'victim';
  ship?: DUniverseType;
  damageDone?: number;
  finalBlow?: boolean;
  weapon?: DUniverseType;
  damageTaken?: number;

  constructor(participant: KillmailParticipant) {
    this.character = new DCharacterShort(participant.character);
    this.type = participant.type;
    this.finalBlow = participant.finalBlow;
    this.damageDone = participant.damageDone;
    this.damageTaken = participant.damageTaken;

    this.ship = participant.ship ? new DUniverseType(participant.ship) : null;
    this.weapon = participant.weapon ? new DUniverseType(participant.weapon) : null;
  }
}
