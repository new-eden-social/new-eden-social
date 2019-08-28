import {
  Controller, Get, Headers, HttpException, HttpStatus, Post, Query,
  Response,
} from '@nestjs/common';
import { DCharacter } from '../character/character.dto';
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { EVESSOService } from '@new-eden-social/eve-sso';
import { AuthenticateGrpcClient } from '@new-eden-social/api-authenticate';
import { CharacterGrpcClient } from '@new-eden-social/api-character';
import { HttpInvalidTokenException } from './invalidToken.exception';
import { DAuthenticated } from './authentication.dto';

@ApiUseTags('authentication')
@Controller('authentication')
export class AuthenticationController {

  constructor(
    private readonly ssoService: EVESSOService,
    private readonly authenticateClient: AuthenticateGrpcClient,
    private readonly characterClient: CharacterGrpcClient,

  ) {
  }

  @ApiResponse({
    status: HttpStatus.FOUND,
    description: 'Redirects to EVE SSO Authentication Page',
  })
  @Get('/sso')
  public async authenticate(@Response() res) {
    res.redirect(this.ssoService.authenticationUrl);
  }

  @ApiResponse({
    status: HttpStatus.FOUND,
    description: 'Callback from EVE SSO, redirects to EVE-Book APP with credentials',
  })
  @Get('/sso/callback')
  public async callback(
    @Response() res,
    @Query('state') state: string,
    @Query('code') code: string,
  ) {
    // Finish SSO flow by exchanging state and code for token
    const authenticationData = await this.ssoService.getAuthenticationToken(state, code);
    // Make first verify to get character info
    const authenticateVerifyData = await this.ssoService.verifyAuthentication(authenticationData.access_token);
    // Create JWT token
    const authenticateResponse = await this.authenticateClient.service.authenticate({
      ssoToken: authenticationData.access_token,
      ssoRefreshToken: authenticationData.refresh_token,
      ssoExpiresIn: authenticationData.expires_in,
      characterId: authenticateVerifyData.CharacterID,
    }).toPromise();

    // Redirect back to application with JWT token and expres in time
    res.redirect(`${process.env.APP_AUTHENTICATION}?token=${authenticateResponse.token}&expiresIn=${authenticationData.expires_in}`);
  }

  @ApiResponse({
    status: HttpStatus.FOUND,
    type: DAuthenticated,
    description: 'Try to refresh token',
  })
  @Post('/refresh')
  public async refresh(
    @Headers('authorization') authorization: string,
  ): Promise<DAuthenticated> {
    const token = authorization.slice('Bearer '.length);

    try {
      // Verify JWT and get characterId and ssoToken out of it
      const verifyResponse = await this.authenticateClient.service.decode({ token }).toPromise();
      const authenticationData = await this.ssoService.refreshToken(verifyResponse.ssoRefreshToken);
      const authenticateResponse = await this.authenticateClient.service.authenticate({
        ssoToken: authenticationData.access_token,
        ssoRefreshToken: authenticationData.refresh_token,
        ssoExpiresIn: authenticationData.expires_in,
        characterId: verifyResponse.characterId,
      }).toPromise();

      return new DAuthenticated(authenticateResponse.token);
    } catch {
      throw new HttpInvalidTokenException();
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: DCharacter,
    description: 'Returns authenticated character',
  })
  @ApiBearerAuth()
  @Get('/verify')
  public async verify(
    @Headers('authorization') authorization: string,
  ): Promise<DCharacter> {
    if (!authorization) {
      throw new HttpException('Authorization header is required!', HttpStatus.BAD_REQUEST);
    }

    const token = authorization.slice('Bearer '.length);

    try {
      // Verify JWT and get characterId and ssoToken out of it
      const verifyResponse = await this.authenticateClient.service.verify({ token }).toPromise();
      // When JWT token is valid, try to validate ssoToken as well
      await this.ssoService.verifyAuthentication(verifyResponse.ssoToken);
      // When both are valid, get character information
      const character = await this.characterClient.service.get(verifyResponse.characterId).toPromise();
      // Return with character information
      return new DCharacter(character);
    } catch {
      throw new HttpInvalidTokenException();
    }
  }
}
