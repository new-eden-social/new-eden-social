import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AllianceService } from '@new-eden-social/services-alliance/alliance.service';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Alliance } from '@new-eden-social/services-alliance/alliance.entity';
import { IAllianceGrpcService, IAllianceResponse,
  IGetNotUpdatedResponse, IExistsGetRefreshRequest, IGetNotUpdatedRequest,
  IAllianceIconResponse } from '@new-eden-social/services-alliance/grpc/alliance.grpc.interface';
import { IAllianceIcon } from '@new-eden-social/services-alliance/alliance.interface';

@Controller()
export class AllianceGrpcController implements IAllianceGrpcService {

  constructor(
    private readonly allianceService: AllianceService,
    ) {
  }

  @GrpcMethod('AllianceService')
  exists(data: IExistsGetRefreshRequest): Observable<{ exists: boolean; }> {
    return from(this.allianceService.exists(data.allianceId)).pipe<{ exists: boolean }>(
      map<boolean, {exists: boolean}>(exists => ({ exists })),
    );
  }

  @GrpcMethod('AllianceService')
  get(data: IExistsGetRefreshRequest): Observable<IAllianceResponse> {
    return from(this.allianceService.get(data.allianceId)).pipe<IAllianceResponse>(
      map<Alliance, IAllianceResponse>(this.allianceTransform)
    );
  }

  @GrpcMethod('AllianceService')
  getNotUpdated(data: IGetNotUpdatedRequest): Observable<IGetNotUpdatedResponse> {
    return from(this.allianceService.getNotUpdated(data.interval, data.limit)).pipe<IGetNotUpdatedResponse>(
      map<Alliance[], IGetNotUpdatedResponse>(alliances => ({
        alliances: alliances.map(this.allianceTransform),
      }))
    );
  }

  @GrpcMethod('AllianceService')
  refresh(data: IExistsGetRefreshRequest): Observable<IAllianceResponse> {
    return from(this.allianceService.get(data.allianceId)).pipe<IAllianceResponse>(
      map<Alliance, IAllianceResponse>(this.allianceTransform)
    );
  }

  private allianceTransform(alliance: Alliance): IAllianceResponse {
    return {
      id: alliance.id,
      handle: alliance.handle,
      name: alliance.name,
      ticker: alliance.ticker,
      dateFounded: alliance.dateFounded.toISOString(),
      executorCorporationId: alliance.executorCorporationId,
      icon: this.iconTransform(alliance.icon),
    };
  }

  private iconTransform(portrait: IAllianceIcon): IAllianceIconResponse {
    return {
      px64x64: portrait.px64x64,
      px128x128: portrait.px128x128,
    };
  }
}
