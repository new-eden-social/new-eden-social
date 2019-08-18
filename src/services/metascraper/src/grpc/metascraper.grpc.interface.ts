import { Observable } from 'rxjs';
import { IURLMetadata } from '../metascraper.interface';

// Should reflect the .proto file!
export interface IMetascraperGrpcService {
  processUrl(url: string): Observable<IURLMetadata>;
}

export * from '../metascraper.interface';
