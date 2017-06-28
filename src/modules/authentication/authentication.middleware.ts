import { HttpException } from '@nestjs/core';
import { Middleware, NestMiddleware } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Middleware()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authenticationService: AuthenticationService) {
  }

  resolve(): (req, res, next) => void {
    return async (req, res, next) => {
      const token = req.headers['authorization'];

      const character = await this.authenticationService.verifyAuthentication(token);

      if (!character) {
        throw new HttpException('Authorization token is not valid.', 401);
      }

      req.character = character;
      next();
    }
  }
}