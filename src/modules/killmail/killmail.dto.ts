import { DParticipantShort } from './participant/participant.dto';
import { Killmail } from './killmail.entity';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class DKillmailShort {
  @ApiModelProperty()
  id: number;
  @ApiModelPropertyOptional()
  warId?: number;
  @ApiModelProperty()
  totalValue: number;
  @ApiModelProperty()
  npc: boolean;
  @ApiModelProperty({ type: String })
  createdAt: Date;
  @ApiModelProperty({ type: DParticipantShort, isArray: true })
  participants: DParticipantShort[];

  constructor(killmail: Killmail) {
    this.id = killmail.id;
    this.warId = killmail.warId;
    this.totalValue = killmail.totalValue;
    this.npc = killmail.npc;
    this.createdAt = killmail.createdAt;
    this.participants = killmail.participants.map(
      participant => new DParticipantShort(participant));
  }
}
