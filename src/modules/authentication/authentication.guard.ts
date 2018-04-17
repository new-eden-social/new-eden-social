import { CanActivate, ExecutionContext, Guard } from '@nestjs/common';
import { UnauthenticatedException } from './unauthenticated.exception';

@Guard()
export class AuthenticationGuard implements CanActivate {
  async canActivate(req, context: ExecutionContext): Promise<boolean> {
    if (!req.character) throw new UnauthenticatedException();
    return true;
  }
}
