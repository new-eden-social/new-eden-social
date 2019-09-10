import { Observable } from 'rxjs';

// Should reflect the .proto file!
export interface ICharacterGrpcService {
  exists(data: IExistsGetRefreshRequest): Observable<IExistsResponse>;
  get(data: IExistsGetRefreshRequest): Observable<ICharacterResponse>;
  getNotUpdated(data: IGetNotUpdatedRequest): Observable<IGetNotUpdatedResponse>;
  refresh(data: IExistsGetRefreshRequest): Observable<ICharacterResponse>;
  roles(data: IExistsGetRefreshRequest): Observable<ICharacterRolesResponse>;
}

export interface ICharacterResponse {
  id: number;
  handle: string;
  corporationId: number;
  name: string;
  description: string;
  gender: string;
  raceId: number;
  bloodlineId: number;
  ancestryId: number;
  securityStatus: number;
  portrait: ICharacterPortraitResponse;
}

export interface ICharacterPortraitResponse {
  px64x64: string;
  px128x128: string;
  px256x256: string;
  px512x512: string;
}

export interface IExistsGetRefreshRequest {
  characterId: number;
}

export interface IGetNotUpdatedRequest {
  interval: string; // interval is PostgreSQL interval value
  limit: number;
}

export interface IExistsResponse {
  exists: boolean;
}

export interface IGetNotUpdatedResponse {
  characters: ICharacterResponse[];
}

export interface ICharacterRolesResponse {
  roles: string[];
}
