import { IKillmailRawWithoutZKB, IKillmailRaw } from '../zkillboard.interface';

export interface IKillmailStreamRaw {
  readonly killID: number;
  readonly killmail: IKillmailRawWithoutZKB;
  readonly zkb: IKillmailRaw['zkb'];
}
