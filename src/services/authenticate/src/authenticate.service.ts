import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './authenticate.interface';
import { EVESSOService } from '@new-eden-social/eve-sso';

@Injectable()
export class AuthenticateService {

  constructor(
    private readonly ssoService: EVESSOService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Sign provided SSO Token
   * This creates JWT Token that should be then used for
   * communication between client and server.
   * @param ssoToken string
   */
  public async authenticate(ssoToken: string): Promise<string> {
    const tokenInfo = await this.ssoService.verifyAuthentication(ssoToken);

    // Expires at the same time as sso token.
    // Should this be like this?
    const expiresIn = new Date(tokenInfo.ExpiresOn).getTime() - new Date().getTime();

    return this.jwtService.signAsync({
      ssoToken,
      characterId: tokenInfo.CharacterID,
    }, {
      expiresIn,
    });
  }

  /**
   * Verify provided JWT Token
   * This token is used for all communitcation betwenn clients and server.
   * @param token string
   */
  public async verify(token: string): Promise<number> {
    const payload = await this.jwtService.verifyAsync<JWTPayload>(token);
    return payload.characterId;
  }
}
