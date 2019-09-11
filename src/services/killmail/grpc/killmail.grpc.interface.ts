import { Observable } from 'rxjs';

// Should reflect the .proto file!
export interface IKillmailGrpcService {
  get(data: IGetRequest): Observable<IKillmailResponse>;
}

export interface IGetRequest {
  killmailId: number;
}

export interface IKillmailResponse {
  id: number;
  locationId: number;
  warId: number;
  totalValue: number;
  npc: boolean;
  createdAt: string;
  participants: IParticipantResponse[];
}

export interface IParticipantResponse {
  characterId: number;
  type: 'attacker' | 'victim'; // attacker | victim
  shipId?: number;
  damageDone: number;
  finalBlow: boolean;
  weaponId: number;
  damageTaken: number;
}
