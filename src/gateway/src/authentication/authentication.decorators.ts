import { createParamDecorator } from '@nestjs/common';
import { IAuthenticatedRequest } from './authentication.interface';
import { ICharacterResponse } from '@new-eden-social/api-character';

// tslint:disable-next-line:variable-name
export const AuthenticatedCharacter = createParamDecorator(
  (data: any, req: IAuthenticatedRequest): ICharacterResponse => {
    return req.character;
  },
);

// tslint:disable-next-line:variable-name
export const AuthorizationToken = createParamDecorator(
  (data: any, req: any): string => {
    return req.headers.authorization;
  },
);
