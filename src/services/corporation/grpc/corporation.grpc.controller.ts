import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICorporationGrpcService, ICorporationResponse, IExistsResponse, IExistsGetRefreshRequest, IGetNotUpdatedRequest, IGetNotUpdatedResponse, ICorporationIconResponse } from './corporation.grpc.interface';
import { CorporationService } from '../corporation.service';
import { Corporation } from '../corporation.entity';
import { ICorporationIcon } from '../corporation.interface';

@Controller()
export class CorporationGrpcController implements ICorporationGrpcService {

  constructor(
    private readonly corporationService: CorporationService,
    ) {
  }

  @GrpcMethod('CorporationService')
  exists(data: IExistsGetRefreshRequest): Observable<IExistsResponse> {
    return from(this.corporationService.exists(data.corporationId)).pipe<IExistsResponse>(
      map<boolean, IExistsResponse>(exists => ({ exists })),
    );
  }

  @GrpcMethod('CorporationService')
  get(data: IExistsGetRefreshRequest): Observable<ICorporationResponse> {
    return from(this.corporationService.get(data.corporationId)).pipe<ICorporationResponse>(
      map<Corporation, ICorporationResponse>(this.corporationTransform)
    );
  }

  @GrpcMethod('CorporationService')
  getNotUpdated(data: IGetNotUpdatedRequest): Observable<IGetNotUpdatedResponse> {
    return from(this.corporationService.getNotUpdated(
      data.interval,
      data.limit)).pipe<IGetNotUpdatedResponse>(
      map<Corporation[], IGetNotUpdatedResponse>(characters => ({
        corporations: characters.map(this.corporationTransform)
      }))
    );
  }

  @GrpcMethod('CorporationService')
  refresh(data: IExistsGetRefreshRequest): Observable<ICorporationResponse> {
    return from(this.corporationService.get(data.corporationId)).pipe<ICorporationResponse>(
      map<Corporation, ICorporationResponse>(this.corporationTransform)
    );
  }

  private corporationTransform(corporation: Corporation): ICorporationResponse {
    return {
      id: corporation.id,
      handle: corporation.handle,
      name: corporation.name,
      ticker: corporation.ticker,
      description: corporation.description,
      ceoId: corporation.ceoId,
      creatorId: corporation.creatorId,
      allianceId: corporation.allianceId,
      executingAllianceId: corporation.executingAllianceId,
      taxRate: corporation.taxRate,
      icon: this.iconTransform(corporation.icon)
    };
  }

  private iconTransform(icon: ICorporationIcon): ICorporationIconResponse {
    return {
      px64x64: icon.px64x64,
      px128x128: icon.px128x128,
      px256x256: icon.px256x256,
    };
  }
}
