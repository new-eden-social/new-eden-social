export interface ICharacterPortrait {
  readonly px64x64: string;
  readonly px128x128: string;
  readonly px256x256: string;
  readonly px512x512: string;
}

export interface ICharacterResponse {
  id: number;
  name: string;
  description: string;
  gender: string;
  raceId: number;
  bloodlineId: number;
  ancestryId: number;
  securityStatus: number;
  portrait: ICharacterPortrait;

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
