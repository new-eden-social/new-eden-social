import { Observable } from 'rxjs';
import { IURLMetadata } from '../metascraper.interface';

// Should reflect the .proto file!
export interface IMetascraperGrpcService {
  processUrl(data: IProcessUrlRequest): Observable<IURLMetadata>;
}

export interface IProcessUrlRequest {
  url: string;
}
