import { CanActivate, ExecutionContext, Guard } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CharacterService } from '../character/character.service';
import Log from '../../utils/Log';

@Guard()
export class CorporationRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private characterService: CharacterService) {
  }

  async canActivate(req, context: ExecutionContext): Promise<boolean> {
    const { parent, handler } = context;

    const requiredRoles = this.reflector.get<string[]>('corporationRoles', handler);
    console.log(requiredRoles);

    if (!requiredRoles) {
      return true;
    }

    const character = req.character;
    const roles = await this.characterService.getRoles(character.id);

    Log.debug('[CorporationRolesGuard]', roles, requiredRoles);

    const hasRole = () => !!roles.find(
      role => !!requiredRoles.find(item => item === role));

    return character && roles && hasRole();
  }
}
