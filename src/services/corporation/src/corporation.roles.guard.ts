import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CharacterService } from '@new-eden-social/api-character';
import { LoggerService } from '@new-eden-social/logger';

@Injectable()
export class CorporationRolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly characterService: CharacterService,
    private readonly loggerService: LoggerService,
  ) {
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const handler = context.getHandler();
    const httpContext = context.switchToHttp();
    const wsContext = context.switchToWs();

    const requiredRoles = this.reflector.get<string[]>('corporationRoles', handler);

    if (!requiredRoles) {
      return true;
    }

    const character = httpContext ?
      httpContext.getRequest().character : wsContext.getClient().character;
    const { roles } = await this.characterService.getRoles(character.id);

    this.loggerService.debug('[CorporationRolesGuard]', roles, requiredRoles);

    const hasRole = () => !!roles.find(
      role => !!requiredRoles.find(item => item === role));

    return character && roles && hasRole();
  }
}
