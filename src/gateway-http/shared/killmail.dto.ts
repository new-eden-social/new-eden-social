import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { DParticipant } from './participant.dto';
import { IKillmailResponse } from '@new-eden-social/services-killmail';

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
  @ApiModelProperty({ type: DParticipant, isArray: true })
  participants: DParticipant[];

  constructor(killmail: IKillmailResponse) {
    this.id = killmail.id;
    this.warId = killmail.warId;
    this.totalValue = killmail.totalValue;
    this.npc = killmail.npc;
    this.createdAt = new Date(killmail.createdAt);
    this.participants = killmail.participants.map(
      participant => new DParticipant(participant));
  }
}
