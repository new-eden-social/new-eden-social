import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICorporationGrpcService, ICorporationEntity } from './corporation.grpc.interface';
import { CorporationService } from '../corporation.service';
import { Corporation } from '../corporation.entity';

@Controller()
export class CorporationGrpcController implements ICorporationGrpcService {

  constructor(
    private readonly corporationService: CorporationService,
    ) {
  }

  @GrpcMethod('CorporationService')
  exists(id: number): Observable<{ exists: boolean; }> {
    return from(this.corporationService.exists(id)).pipe<{ exists: boolean }>(
      map<boolean, {exists: boolean}>(exists => ({ exists })),
    );
  }

  @GrpcMethod('CorporationService')
  get(id: number): Observable<ICorporationEntity> {
    return from(this.corporationService.get(id)).pipe<ICorporationEntity>(
      map<Corporation, ICorporationEntity>(corporation => ({
        id: corporation.id,
        handle: corporation.handle,
        name: corporation.name,
      }))
    );
  }
}
