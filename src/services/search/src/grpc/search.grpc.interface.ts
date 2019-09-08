import { Observable } from 'rxjs';
import { IUniverseName } from '@new-eden-social/esi';

// Should reflect the .proto file!
export interface ISearchGrpcService {
  search(data: ISearchRequest): Observable<ISearchResponse>;
}

export interface ISearchRequest {
  query: string;
}

export interface ISearchResponse {
  results: IUniverseName[];
}
