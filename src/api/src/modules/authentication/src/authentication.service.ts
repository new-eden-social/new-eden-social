import { Injectable } from '@nestjs/common';
import { EVESSOService, IAuthenticationResponse } from '@new-eden-social/eve-sso';
import { CharacterService } from '@new-eden-soci@new-eden-social/api-character';
import { Character } from '@new-eden-soci@new-eden-social/api-character';

@Injectable()
export class AuthenticationService {

  constructor(
    private readonly ssoService: EVESSOService,
    private readonly charactersService: CharacterService,
  ) {
  }

  public get authenticationRedirect() {
    return this.ssoService.authenticationUrl;
  }

  public async authenticationToken(state: string, code: string): Promise<IAuthenticationResponse> {
    return this.ssoService.getAuthenticationToken(state, code);
  }

  public async refreshToken(refreshToken: string): Promise<IAuthenticationResponse> {
    return this.ssoService.refreshToken(refreshToken);
  }

  public async verifyAuthentication(token): Promise<Character> {
    const authenticationData = await this.ssoService.verifyAuthentication(token);
    return this.charactersService.get(authenticationData.CharacterID);
  }

}
