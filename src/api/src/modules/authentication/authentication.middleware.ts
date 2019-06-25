import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { TokenExpiredException } from '@new-eden-social/eve-sso';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authenticationService: AuthenticationService) {
  }

  async use(req, res, next): Promise<void> {
    // If no headers continue
    if (!req.headers.authorization) { return next(); }

    // Else, we validate provided token
    try {
      const token = req.headers.authorization.slice('Bearer '.length);
      req.token = token;
      req.character = await this.authenticationService.verifyAuthentication(token);
    } catch (error) {
      if (error instanceof TokenExpiredException) {
        // we continue with execution
        req.character = null;
        return next();
      }
      // If some other error, re-throw
      throw error;
    }

    next();
  }
}
