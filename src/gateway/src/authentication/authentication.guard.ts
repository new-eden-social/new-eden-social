import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import {
  HttpUnauthenticatedException,
} from './unauthenticated.exception';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    if (!request.character) {
      throw new HttpUnauthenticatedException();
    }

    return true;
  }
}
