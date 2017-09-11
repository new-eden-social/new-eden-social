export interface ICharacterResponse {
  id: number;
  name: string;
  description: string;
  gender: string;
  raceId: number;
  bloodlineId: number;
  ancestryId: number;
  securityStatus: number;
  portrait: {
    px64x64: string;
    px128x128: string;
    px256x256: string;
    px512x512: string;
  };
  iskDestroyed: number;
  iskLost: number;
  pointsDestroyed: number;
  pointsLost: number;
  shipsDestroyed: number;
  shipsLost: number;
  soloKills: number;
  soloLosses: number;
}
