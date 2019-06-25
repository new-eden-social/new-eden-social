import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import {
  HttpUnauthenticatedException,
  WsUnauthenticatedException,
} from './unauthenticated.exception';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const httpContext = context.switchToHttp();
    const wsContext = context.switchToWs();

    // Depending on context, check if authenticated
    if (httpContext) {
      const request = httpContext.getRequest();
      if (!request.character) { throw new HttpUnauthenticatedException(); }
    } else if (wsContext) {
      const client = wsContext.getClient();
      if (!client.character) { throw new WsUnauthenticatedException(); }
    }

    return true;
  }
}
