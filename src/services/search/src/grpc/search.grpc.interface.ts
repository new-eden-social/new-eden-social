import { Observable } from 'rxjs';
import { IUniverseName } from '@new-eden-social/esi';

// Should reflect the .proto file!
export interface ISearchGrpcService {
  search(query: string): Observable<IUniverseName[]>;
}
