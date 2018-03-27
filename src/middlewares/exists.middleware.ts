import { Middleware, NestMiddleware } from '@nestjs/common';
import { ExpressMiddleware } from '@nestjs/common/interfaces/middlewares';
import { IService } from '../interfaces/service.interface';
import { EntityNotFoundException } from '../exceptions/entityNotFound.exception';

@Middleware()
export abstract class ExistsMiddleware<T> implements NestMiddleware {

  protected abstract service: IService<T>;
  protected abstract entityName: string;

  async resolve(): Promise<ExpressMiddleware> {
    return async (req, res, next) => {

      const entity = await this.service.exists(this.getId(req));
      if (!entity) throw new EntityNotFoundException(this.entityName);

      next();
    };
  }

  protected abstract getId(req): number;
}
