import { HttpException } from '@nestjs/core';
import { Middleware, NestMiddleware } from '@nestjs/common';
import { ExpressMiddleware } from '@nestjs/common/interfaces/middlewares';
import { IService } from '../interfaces/service.interface';
import Log from '../utils/Log';

@Middleware()
export abstract class ExistsMiddleware<T> implements NestMiddleware {

  protected abstract service: IService<T>;

  async resolve(): Promise<ExpressMiddleware> {
    return async (req, res, next) => {

      const entity = await this.service.exists(this.getId(req));
      if (!entity) throw new HttpException('Entity not found', 404);

      next();
    };
  }

  protected abstract getId(req): number;
}
