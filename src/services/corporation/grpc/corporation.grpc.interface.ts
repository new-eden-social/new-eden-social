import { Observable } from 'rxjs';

// Should reflect the .proto file!
export interface ICorporationGrpcService {
  exists(data: IExistsGetRefreshRequest): Observable<IExistsResponse>;
  get(data: IExistsGetRefreshRequest): Observable<ICorporationResponse>;
  getNotUpdated(data: IGetNotUpdatedRequest): Observable<IGetNotUpdatedResponse>;
  refresh(data: IExistsGetRefreshRequest): Observable<ICorporationResponse>;
}

export interface ICorporationResponse {
  id: number;
  handle: string;
  name: string;
  ticker: string;
  description: string;
  ceoId: number;
  creatorId: number;
  allianceId: number;
  executingAllianceId: number;
  taxRate: number;
  icon: ICorporationIconResponse;
}

export interface ICorporationIconResponse {
  px64x64: string;
  px128x128: string;
  px256x256: string;
}

export interface IExistsGetRefreshRequest {
  corporationId: number;
}

export interface IGetNotUpdatedRequest {
  interval: string; // interval is PostgreSQL interval value
  limit: number;
}

export interface IExistsResponse {
  exists: boolean;
}

export interface IGetNotUpdatedResponse {
  corporations: ICorporationResponse[];
}