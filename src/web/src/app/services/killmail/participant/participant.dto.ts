import { DCharacterShort } from '../../character/character.dto';
import { DUniverseType } from '../../universe/type/type.dto';

export class DParticipantShort {
  character: DCharacterShort;
  type: 'attacker' | 'victim';
  ship?: DUniverseType;
  damageDone?: number;
  finalBlow?: boolean;
  weapon?: DUniverseType;
  damageTaken?: number;
}
