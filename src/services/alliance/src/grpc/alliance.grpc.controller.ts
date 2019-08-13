import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { IAllianceService } from './alliance.grpc.interface';
import { AllianceService } from '../alliance.service';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller()
export class AllianceGrpcController implements IAllianceService {

  constructor(
    private readonly allianceService: AllianceService,
    ) {
  }

  @GrpcMethod('allianceService')
  exists(id: number): Observable<{ exists: boolean; }> {
    return from(this.allianceService.exists(id)).pipe<{ exists: boolean }>(
      map<boolean, {exists: boolean}>(exists => ({ exists })),
    );
  }
}
