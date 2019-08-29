import { Observable } from 'rxjs';

// Should reflect the .proto file!
export interface ICharacterGrpcService {
  exists(data: IExistsGetRefreshRequest): Observable<IExistsResponse>;
  get(data: IExistsGetRefreshRequest): Observable<IGetRefreshResponse>;
  getNotUpdated(interval: string, limit: number): Observable<IGetNotUpdatedResponse>;
  refresh(data: IExistsGetRefreshRequest): Observable<IGetRefreshResponse>;
}

export interface ICharacterEntity {
  id: number;
  handle: string;
  name: string;
}

export interface IExistsGetRefreshRequest {
  characterId: number;
}

export interface IGetRefreshResponse {
  character: ICharacterEntity;
}

export interface IExistsResponse {
  exists: boolean;
}

export interface IGetNotUpdatedResponse {
  characters: ICharacterEntity[];
}