import { ICorporationResponse } from '../corporation/corporation.interface';

export interface IAllianceResponse {
  id: number;
  name: string;
  ticker: string;
  dateFounded: Date;

  // corporations: ICorporationResponse[];
  executorCorporation: ICorporationResponse;

  hasSupers: boolean;
  iskDestroyed: number;
  iskLost: number;
  pointsDestroyed: number;
  pointsLost: number;
  shipsDestroyed: number;
  shipsLost: number;
  soloKills: number;
  soloLosses: number;
  memberCount: number;
  corpCount: number;
}
