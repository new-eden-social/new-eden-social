import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { IAllianceGrpcService, IAllianceEntity } from './alliance.grpc.interface';
import { AllianceService } from '../alliance.service';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Alliance } from '../alliance.entity';

@Controller()
export class AllianceGrpcController implements IAllianceGrpcService {

  constructor(
    private readonly allianceService: AllianceService,
    ) {
  }

  @GrpcMethod('AllianceService')
  exists(id: number): Observable<{ exists: boolean; }> {
    return from(this.allianceService.exists(id)).pipe<{ exists: boolean }>(
      map<boolean, {exists: boolean}>(exists => ({ exists })),
    );
  }

  @GrpcMethod('AllianceService')
  get(id: number): Observable<IAllianceEntity> {
    return from(this.allianceService.get(id)).pipe<IAllianceEntity>(
      map<Alliance, IAllianceEntity>(alliance => ({
        id: alliance.id,
        handle: alliance.handle,
        name: alliance.name,
        ticker: alliance.ticker,
        dateFounded: alliance.dateFounded.toString(),
        executorCorporationId: alliance.executorCorporationId,
      }))
    );
  }
}
