import { IAllianceResponse } from '../alliance/alliance.interface';

export interface ICorporationResponse {
  id: number;
  name: string;
  ticker: string;
  description: string;
  alliance: IAllianceResponse;

  /* LIVE Data*/
  iskDestroyed: number;
  iskLost: number;
  pointsDestroyed: number;
  pointsLost: number;
  shipsDestroyed: number;
  shipsLost: number;
  soloKills: number;
  soloLosses: number;
}
