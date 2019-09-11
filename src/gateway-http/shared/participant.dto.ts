import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IParticipantResponse } from '@new-eden-social/services-killmail';

export class DParticipant {
  @ApiModelProperty()
  characterId: number;
  @ApiModelProperty()
  type: 'attacker' | 'victim';
  @ApiModelPropertyOptional()
  shipId?: number;
  @ApiModelPropertyOptional()
  damageDone?: number;
  @ApiModelPropertyOptional()
  finalBlow?: boolean;
  @ApiModelPropertyOptional()
  weaponId?: number;
  @ApiModelPropertyOptional()
  damageTaken?: number;

  constructor(participant: IParticipantResponse) {
    this.characterId = participant.characterId;
    this.type = participant.type;
    this.finalBlow = participant.finalBlow;
    this.damageDone = participant.damageDone;
    this.damageTaken = participant.damageTaken;

    this.shipId = participant.shipId;
    this.weaponId = participant.weaponId;
  }
}
