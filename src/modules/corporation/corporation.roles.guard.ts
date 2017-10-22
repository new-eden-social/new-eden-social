import { CanActivate, ExecutionContext, Guard } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Guard()
export class CorporationRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
  }

  canActivate(req, context: ExecutionContext): boolean {
    const { parent, handler } = context;

    const roles = this.reflector.get<string[]>('corporationRoles', handler);

    if (!roles) {
      return true;
    }

    const character = req.character;
    const hasRole = () => !!character.roles.find(role => !!roles.find(item => item === role));

    return character && character.roles && hasRole();
  }
}
