import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UnauthenticatedException } from './unauthenticated.exception';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.character) throw new UnauthenticatedException();
    return true;
  }
}
