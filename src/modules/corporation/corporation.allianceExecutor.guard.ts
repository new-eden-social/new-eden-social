import { CanActivate, ExecutionContext, Guard } from '@nestjs/common';
import Log from '../../utils/Log';
import { AllianceService } from '../alliance/alliance.service';

@Guard()
export class CorporationAllianceExecutorGuard implements CanActivate {
  constructor(private allianceService: AllianceService) {
  }

  async canActivate(req, context: ExecutionContext): Promise<boolean> {
    const { parent, handler } = context;

    const character = req.character;

    // TODO: Handle "not in alliance" exception! #74

    const executorCorporation = await this.allianceService.getExecutorCorporation(
      character.corporation.alliance.id);

    Log.debug(
      '[CorporationAllianceExecutorGuard]',
      character.alliance,
      executorCorporation);

    return character && executorCorporation && character.corporation.id === executorCorporation.id;
  }
}
