import {
  Body, Controller, Get, Headers, HttpException, HttpStatus, Post, Query,
  Response,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { DCharacterShort } from '../character/character.dto';
import { ApiBearerAuth, ApiImplicitBody, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { IAuthenticationResponse } from '../core/external/sso/sso.interface';

@ApiUseTags('authentication')
@Controller('authentication')
export class AuthenticationController {

  constructor(
    private authenticationService: AuthenticationService,
  ) {
  }

  @ApiResponse({
    status: HttpStatus.FOUND,
    description: 'Redirects to EVE SSO Authentication Page',
  })
  @Get('/sso')
  public async authenticate(@Response() res) {
    res.redirect(this.authenticationService.authenticationRedirect);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: DCharacterShort,
    description: 'Returns authenticated character',
  })
  @ApiBearerAuth()
  @Get('/sso/verify')
  public async verify(
    @Headers('authorization') token: string,
  ): Promise<DCharacterShort> {
    if (!token) {
      throw new HttpException('Authorization header is required!', HttpStatus.BAD_REQUEST);
    }

    const character = await this.authenticationService
    .verifyAuthentication(token.slice('Bearer '.length));

    return new DCharacterShort(character);
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
    const response = await this.authenticationService.authenticationToken(state, code);

    let redirectUrl = process.env.APP_AUTHENTICATION;
    redirectUrl = `${redirectUrl}?access_token=${response.access_token}`;
    redirectUrl = `${redirectUrl}&refresh_token=${response.refresh_token}`;
    redirectUrl = `${redirectUrl}&expires_in=${response.expires_in}`;
    redirectUrl = `${redirectUrl}&token_type=${response.token_type}`;

    // Redirect back to application
    res.redirect(redirectUrl);
  }

  // TODO: Add response DTO to ApiResponse
  @ApiResponse({
    status: HttpStatus.FOUND,
    description: 'Try to refresh token',
  })
  @ApiImplicitBody({ name: 'refresh_token', type: String })
  @Post('/sso/refresh')
  public async refresh(
    @Body('refresh_token') refreshToken: string,
  ): Promise<IAuthenticationResponse> {
    return await this.authenticationService.refreshToken(refreshToken);
  }

}
