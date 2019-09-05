import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { LoggerService } from '@new-eden-social/logger';

@Injectable()
export class CorporationAllianceExecutorGuard implements CanActivate {
  constructor(
    private readonly allianceService: AllianceService,
    private readonly loggerService: LoggerService,
  ) {
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const character = request.character;

    // TODO: Handle "not in alliance" exception! #74

    const executorCorporation = await this.allianceService.getExecutorCorporation(
      character.corporation.alliance.id);

    this.loggerService.debug(
      '[CorporationAllianceExecutorGuard]',
      character.alliance,
      executorCorporation);

    return character && executorCorporation && character.corporation.id === executorCorporation.id;
  }
}
