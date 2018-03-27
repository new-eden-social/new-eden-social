import { Component } from '@nestjs/common';
import { SSOService } from '../core/external/sso/sso.service';
import { IAuthenticationResponse } from '../core/external/sso/sso.interface';
import { CharacterService } from '../character/character.service';
import { Character } from '../character/character.entity';

@Component()
export class AuthenticationService {

  constructor(
    private ssoService: SSOService,
    private charactersService: CharacterService,
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
