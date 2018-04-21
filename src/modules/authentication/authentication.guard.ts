import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UnauthenticatedException } from './unauthenticated.exception';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  async canActivate(req, context: ExecutionContext): Promise<boolean> {
    if (!req.character) throw new UnauthenticatedException();
    return true;
  }
}
