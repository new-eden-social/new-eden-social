import { Observable } from 'rxjs';

// Should reflect the .proto file!
export interface ICorporationGrpcService {
  exists(id: number): Observable<{ exists: boolean }>;
  get(id: number): Observable<ICorporationEntity>;
  getNotUpdated(interval: string, limit: number): Observable<ICorporationEntity[]>;
  refresh(id: number): Observable<ICorporationEntity>;
}

export interface ICorporationEntity {
  id: number;
  handle: string;
  name: string;
}
