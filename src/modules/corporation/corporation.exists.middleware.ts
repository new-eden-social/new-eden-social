import { Middleware } from '@nestjs/common';
import { ExistsMiddleware } from '../../middlewares/exists.middleware';
import { Corporation } from './corporation.entity';
import { CorporationService } from './corporation.service';

@Middleware()
export class CorporationExistsMiddleware extends ExistsMiddleware<Corporation> {

  protected entityName = 'Alliance';

  constructor(protected service: CorporationService) {
    super();
  }

  protected getId(req): number {
    return req.params.corporationId;
  }

}
