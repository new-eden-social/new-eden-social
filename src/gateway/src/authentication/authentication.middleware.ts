import { Injectable, NestMiddleware } from '@nestjs/common';
import { TokenExpiredException } from '@new-eden-social/eve-sso';
import { AuthenticateGrpcClient } from '@new-eden-social/api-authenticate';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authenticationClient: AuthenticateGrpcClient) {
  }

  async use(req, res, next): Promise<void> {
    // If no headers continue
    if (!req.headers.authorization) { return next(); }

    // Try to validate token. If it fails, still continue,
    // as this middleware is global, and guards actualy handle
    // that un-authenticated users can access things.
    try {
      const token = req.headers.authorization.slice('Bearer '.length);
      req.token = token;
      req.characterId = await this.authenticationClient.service.verify({ token });
    } catch (error) {
      req.characterId = null;
    }

    next();
  }
}
