import { DCharacterShort } from '../@new-eden-social/services-character/character.dto';
import { KillmailParticipant } from './participant.entity';
import { DUniverseType } from '../../universe/type/type.dto';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class DParticipantShort {
  @ApiModelProperty()
  character: DCharacterShort;
  @ApiModelProperty()
  type: 'attacker' | 'victim';
  @ApiModelPropertyOptional()
  ship?: DUniverseType;
  @ApiModelPropertyOptional()
  damageDone?: number;
  @ApiModelPropertyOptional()
  finalBlow?: boolean;
  @ApiModelPropertyOptional()
  weapon?: DUniverseType;
  @ApiModelPropertyOptional()
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
