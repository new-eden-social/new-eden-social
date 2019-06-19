import { DParticipantShort } from './participant/participant.dto';

export class DKillmailShort {
  id: number;
  warId?: number;
  totalValue: number;
  npc: boolean;
  createdAt: Date;
  participants: DParticipantShort[];
}
