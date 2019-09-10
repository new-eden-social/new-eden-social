import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from '@new-eden-social/services-authenticate/authenticate.interface';

@Injectable()
export class AuthenticateService {

  constructor(
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Sign provided SSO Token and Refresh Token as well as expiresOn to sync expiration with jwt
   * token.
   * This creates JWT Token that should be then used for
   * communication between client and server.
   * @param ssoToken string
   * @param ssoRefreshToken string
   * @param ssoExpiresIn string
   * @param characterId string
   */
  public async authenticate(ssoToken: string, ssoRefreshToken: string, ssoExpiresIn: string, characterId: number): Promise<string> {

    return this.jwtService.signAsync({
      ssoToken,
      ssoRefreshToken,
      characterId,
    }, {
      expiresIn: ssoExpiresIn,
    });
  }

  /**
   * Verify provided JWT Token
   * This token is used for all communitcation betwenn clients and server.
   * @param token string
   */
  public async verify(token: string): Promise<JWTPayload> {
    return this.jwtService.verifyAsync<JWTPayload>(token);
  }

  /**
   * Decoded provided JWT Token
   * @param token string
   */
  public decode(token: string): JWTPayload {
    const payload = this.jwtService.decode(token);
    if (payload === null) {
      throw new Error('Invalid token provided');
    }

    return payload as JWTPayload;
  }
}
