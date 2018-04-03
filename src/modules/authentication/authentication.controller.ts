import { Body, Controller, Get, Headers, HttpStatus, Post, Query, Response } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { HttpException } from '@nestjs/core';
import { DCharacterShort } from '../character/character.dto';
import { ApiBearerAuth, ApiImplicitBody, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { IAuthenticationResponse } from '../core/external/sso/sso.interface';

@ApiUseTags('authentication')
@Controller('authentication')
export class AuthenticationController {

  constructor(private authenticationService: AuthenticationService) {
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
    if (!token) throw new HttpException(
      'Authorization header is required!',
      HttpStatus.BAD_REQUEST);

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

    // Redirect back to application
    res.redirect(process.env.APP_AUTHENTICATION
      + `?access_token=${response.access_token}`
      + `&refresh_token=${response.refresh_token}`
      + `&expires_in=${response.expires_in}`
      + `&token_type=${response.token_type}`);
  }

  // TODO: Add response DTO to ApiResponse
  @ApiResponse({
    status: HttpStatus.FOUND,
    description: 'Callback from EVE SSO, redirects to EVE-Book APP with credentials',
  })
  @ApiImplicitBody({ name: 'refresh_token', type: String })
  @Post('/sso/refresh')
  public async refresh(
    @Body('refresh_token') refreshToken: string,
  ): Promise<IAuthenticationResponse> {
    console.log(refreshToken);
    return await this.authenticationService.refreshToken(refreshToken);
  }

}
