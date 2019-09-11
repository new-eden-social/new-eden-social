import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { LoggerService } from '@new-eden-social/logger';
import { CharacterGrpcClient } from '@new-eden-social/services-character';

@Injectable()
export class CorporationRolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly characterClient: CharacterGrpcClient,
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
    const { roles } = await this.characterClient.service.roles({
      characterId: character.id,
    }).toPromise();

    this.loggerService.debug('[CorporationRolesGuard]', roles, requiredRoles);

    const hasRole = () => !!roles.find(
      role => !!requiredRoles.find(item => item === role));

    return character && roles && hasRole();
  }
}
