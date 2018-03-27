import { createRouteParamDecorator } from '@nestjs/common';
import { IAuthenticatedRequest } from './authentication.interface';
import { Character } from '../character/character.entity';

// tslint:disable-next-line:variable-name
export const AuthenticatedCharacter = createRouteParamDecorator(
  (data: any, req: IAuthenticatedRequest): Character => {
    return req.character;
  },
);

// tslint:disable-next-line:variable-name
export const AuthorizationToken = createRouteParamDecorator(
  (data: any, req: IAuthenticatedRequest): string => {
    return req.headers['authorization'];
  },
);
