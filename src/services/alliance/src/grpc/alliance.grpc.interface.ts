import { Observable } from 'rxjs';

// Should reflect the .proto file!
export interface IAllianceGrpcService {
  exists(id: number): Observable<{ exists: boolean }>;
  get(id: number): Observable<IAllianceEntity>;
  getNotUpdated(interval: string, limit: number): Observable<IAllianceEntity[]>;
  refresh(id: number): Observable<IAllianceEntity>;
}

export interface IAllianceEntity {
  id: number;
  handle: string;
  name: string;
  ticker: string;
  dateFounded: string;
  executorCorporationId: number;
}
