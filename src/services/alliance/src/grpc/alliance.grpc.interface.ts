import { Observable } from 'rxjs';

// Should reflect the .proto file!
export interface IAllianceGrpcService {
  exists(data: IExistsGetRefreshRequest): Observable<IExistsResponse>;
  get(data: IExistsGetRefreshRequest): Observable<IAllianceResponse>;
  getNotUpdated(data: IGetNotUpdatedRequest): Observable<IGetNotUpdatedResponse>;
  refresh(data: IExistsGetRefreshRequest): Observable<IAllianceResponse>;
}

export interface IAllianceResponse {
  id: number;
  handle: string;
  name: string;
  ticker: string;
  dateFounded: string;
  executorCorporationId: number;
  icon: IAllianceIconResponse;
}

export interface IAllianceIconResponse {
  px64x64: string;
  px128x128: string;
}

export interface IExistsGetRefreshRequest {
  allianceId: number;
}

export interface IGetNotUpdatedRequest {
  interval: string; // interval is PostgreSQL interval value
  limit: number;
}

export interface IExistsResponse {
  exists: boolean;
}

export interface IGetNotUpdatedResponse {
  alliances: IAllianceResponse[];
}