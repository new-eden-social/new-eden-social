import { HttpException } from '@nestjs/core';
import { Middleware, NestMiddleware } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { TokenExpiredException } from '../external/sso/sso.exceptions';

@Middleware()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authenticationService: AuthenticationService) {
  }

  resolve(): (req, res, next) => void {
    return async (req, res, next) => {
      const token = req.headers['authorization'];

      try {
        req.character = await this.authenticationService
        .verifyAuthentication(token.slice('Bearer '.length));
      } catch (error) {
        if (error instanceof TokenExpiredException) {
          // TODO: Throw instance of ApiException
          throw new HttpException('Authorization token is not valid.', 401);
        }
        // If some other error, re-throw
        throw error;
      }

      next();
    };
  }
}
