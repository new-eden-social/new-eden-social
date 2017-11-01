import { Middleware, NestMiddleware } from '@nestjs/common';
import { ExistsMiddleware } from '../../middlewares/exists.middleware';
import { AllianceService } from './alliance.service';
import { Alliance } from './alliance.entity';

@Middleware()
export class AllianceExistsMiddleware extends ExistsMiddleware<Alliance> {

  constructor(protected service: AllianceService) {
    super();
  }

  protected getId(req): number {
    return req.params.allianceId;
  }


}
