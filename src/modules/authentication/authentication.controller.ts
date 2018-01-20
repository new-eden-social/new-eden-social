import { Body, Controller, Get, Headers, HttpStatus, Post, Query, Response } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { HttpException } from '@nestjs/core';
import { DCharacterShort } from '../character/character.dto';

@Controller('authentication')
export class AuthenticationController {

  constructor(private authenticationService: AuthenticationService) {
  }

  @Get('/sso')
  public async authenticate(@Response() res) {
    res.redirect(this.authenticationService.authenticationRedirect);
  }

  @Get('/sso/verify')
  public async verify(@Response() res, @Headers('authorization') token: string) {
    if (!token) throw new HttpException(
      'Authorization header is required!',
      HttpStatus.BAD_REQUEST);

    const character = await this.authenticationService
    .verifyAuthentication(token.slice('Bearer '.length));

    res.json(new DCharacterShort(character));
  }

  @Get('/sso/callback')
  public async callback(@Response() res, @Query('state') state, @Query('code') code) {
    const response = await this.authenticationService.authenticationToken(state, code);

    // Redirect back to application
    res.redirect(process.env.APP_AUTHENTICATION
      + `?access_token=${response.access_token}`
      + `&refresh_token=${response.refresh_token}`
      + `&expires_in=${response.expires_in}`
      + `&token_type=${response.token_type}`);
  }

  @Post('/sso/refresh')
  public async refresh(@Response() res, @Body('refresh_token') refreshToken) {
    const response = await this.authenticationService.refreshToken(refreshToken);
    res.json(response);
  }

}
