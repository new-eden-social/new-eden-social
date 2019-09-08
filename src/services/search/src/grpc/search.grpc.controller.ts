import { Controller } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ISearchGrpcService, ISearchRequest, ISearchResponse } from './search.grpc.interface';
import { SearchService } from '../search.service';
import { IUniverseName } from '@new-eden-social/esi';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class SearchrGrpcController implements ISearchGrpcService {

  constructor(
    private readonly searchService: SearchService
  ){}

  @GrpcMethod('SearchService')
  search(data: ISearchRequest): Observable<ISearchResponse> {
    return from(this.searchService.search(data.query)).pipe<ISearchResponse>(
      map<IUniverseName[], ISearchResponse>(results => ({ results }))
    );
  }
}
