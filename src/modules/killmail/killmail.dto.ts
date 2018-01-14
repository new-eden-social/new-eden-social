import { DParticipantShort } from './participant/participant.dto';
import { Killmail } from './killmail.entity';

export class DKillmailShort {
  id: number;
  warId?: number;
  totalValue: number;
  npc: boolean;
  createdAt: Date;
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
