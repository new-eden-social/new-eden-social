import { Observable } from 'rxjs';

// Should reflect the .proto file!
export interface IHashtagGrpcService {
  parse(text: string): Observable<string[]>;
}
