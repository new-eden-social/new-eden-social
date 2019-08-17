import { Observable } from 'rxjs';

// Should reflect the .proto file!
export interface ICharacterGrpcService {
  exists(id: number): Observable<{ exists: boolean }>;
  get(id: number): Observable<ICharacterEntity>;
}

export interface ICharacterEntity {
  id: number;
  handle: string;
  name: string;
}
