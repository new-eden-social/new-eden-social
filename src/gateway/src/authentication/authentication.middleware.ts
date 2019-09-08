import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthenticateGrpcClient } from '@new-eden-social/api-authenticate';
import { CharacterGrpcClient } from '@new-eden-social/api-character';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly authenticationClient: AuthenticateGrpcClient,
    private readonly characterClient: CharacterGrpcClient,
  ) {
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
      const verifyResponse = await this.authenticationClient.service.verify({ token }).toPromise();
      req.character = await this.characterClient.service.get({ characterId: verifyResponse.characterId}).toPromise();
    } catch (error) {
      req.character = null;
    }

    next();
  }
}
