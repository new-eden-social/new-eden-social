import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { LoggerService } from '@new-eden-social/logger';
import { AllianceGrpcClient } from '@new-eden-social/services-alliance';
import { CorporationGrpcClient } from '@new-eden-social/services-corporation';
import { IAuthenticatedRequest } from '../authentication/authentication.interface';

@Injectable()
export class CorporationAllianceExecutorGuard implements CanActivate {
  constructor(
    private readonly allianceClient: AllianceGrpcClient,
    private readonly corporationClient: CorporationGrpcClient,
    private readonly loggerService: LoggerService,
  ) {
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IAuthenticatedRequest>();

    const character = request.character;
    if (character.corporationId == null) {
      return false;
    }

    const corporation = await this.corporationClient.service.get({
      corporationId: character.corporationId,
    }).toPromise();
    if (corporation.allianceId == null) {
      return false;
    }

    const alliance = await this.allianceClient.service.get({
      allianceId: corporation.allianceId,
    }).toPromise();
    if (alliance.executorCorporationId !== corporation.id) {
      return false;
    }

    this.loggerService.debug(
      '[CorporationAllianceExecutorGuard] => allow',
      character.corporationId,
      alliance.executorCorporationId);

    return true;
  }
}
