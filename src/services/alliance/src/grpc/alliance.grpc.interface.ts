import { Observable } from 'rxjs';

// Should reflect the .proto file!
export interface IAllianceService {
  exists(id: number): Observable<{ exists: boolean }>;
}
