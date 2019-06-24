import { IKillmailRawWithoutZKB, IKillmailRaw } from '@new-eden-social/zkillboard';

export interface IKillmailStreamRaw {
  readonly killID: number;
  readonly killmail: IKillmailRawWithoutZKB;
  readonly zkb: IKillmailRaw['zkb'];
}
