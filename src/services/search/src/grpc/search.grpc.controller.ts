import { Controller } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { ISearchGrpcService } from './search.grpc.interface';
import { SearchService } from '../search.service';
import { IUniverseName } from '@new-eden-social/esi';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class SearchrGrpcController implements ISearchGrpcService {

  constructor(
    private readonly searchService: SearchService
  ){}

  @GrpcMethod('SearchService')
  search(query: string): Observable<IUniverseName[]> {
    return from(this.searchService.search(query));
  }
}
