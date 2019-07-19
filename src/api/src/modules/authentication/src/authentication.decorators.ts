import { createParamDecorator } from '@nestjs/common';
import { IAuthenticatedRequest } from './authentication.interface';
import { Character } from '@new-eden-soci@new-eden-social/api-character';

// tslint:disable-next-line:variable-name
export const AuthenticatedCharacter = createParamDecorator(
  (data: any, req: IAuthenticatedRequest): Character => {
    return req.character;
  },
);

// tslint:disable-next-line:variable-name
export const AuthorizationToken = createParamDecorator(
  (data: any, req: any): string => {
    return req.headers.authorization;
  },
);
