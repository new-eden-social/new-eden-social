import { Injectable } from '@nestjs/common';
import Axios, { AxiosInstance } from 'axios';
import { IAuthenticationResponse, IAuthenticationVerify } from './evesso.interface';
import { TokenExpiredException } from './tokenExpired.exception';

@Injectable()
export class EVESSOService {

  private readonly baseUrl = 'https://login.eveonline.com/oauth/';
  private readonly userAgent = `@new-eden-social/eve-sso:${process.env.npm_package_version} https://github.com/new-eden-social/new-eden-social`;
  private readonly client: AxiosInstance;

  // TODO: This should be passed as arguments to Module.forRoot() or via providers
  private readonly authenticationRedirect = process.env.ESI_REDIRECT as string;
  private readonly clientId = process.env.ESI_CLIENT as string;
  private readonly secretKey = process.env.ESI_SECRET as string;
  private readonly scope = process.env.ESI_SCOPE as string;

  constructor() {
    this.client = Axios.create({
      baseURL: this.baseUrl,
      headers: {
        'User-Agent': this.userAgent,
        'Accept': 'application/json',
      },
    });
  }

  /**
   * Get authentication url
   * @return {string}
   */
  public get authenticationUrl() {
    let url = `${this.baseUrl}authorize`;
    url = `${url}?response_type=code`;
    url = `${url}&redirect_uri=${this.authenticationRedirect}`;
    url = `${url}&client_id=${this.clientId}`;
    url = `${url}&scope=${this.scope}`;
    // TODO + `&state=someRandomThingThatWeCanVerify
    return url;
  }

  /**
   * Get authorization header for verifying authentication
   * @return {string}
   */
  private get authorizationHeader() {
    const token = Buffer.from(`${this.clientId}:${this.secretKey}`).toString('base64');
    return `Basic ${token}`;
  }

  /**
   * Get authentication access token
   * @param state
   * @param code
   * @return {Promise<IAuthenticationResponse>}
   */
  public async getAuthenticationToken(
    state: string,
    code: string,
  ): Promise<IAuthenticationResponse> {
    const response = await this.client.request({
      url: 'token/',
      method: 'POST',
      params: {
        code,
        grant_type: 'authorization_code',
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': this.authorizationHeader,
      },
    });

    return response.data;
  }

  /**
   * Use refresh token to obtain new access token
   * @param refreshToken
   * @return {Promise<IAuthenticationResponse>}
   */
  public async refreshToken(refreshToken: string): Promise<IAuthenticationResponse> {
    const response = await this.client.request({
      url: 'token/',
      method: 'POST',
      params: {
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': this.authorizationHeader,
      },
    });

    return response.data;
  }

  /**
   * Use to check if token is valid
   * @param token
   * @return {Promise<IAuthenticationVerify>}
   */
  public async verifyAuthentication(token: string): Promise<IAuthenticationVerify> {

    try {
      const response = await this.client.request({
        url: 'verify/',
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (err) {
      // Check if we caught axios 400 error
      if (err.response && err.response.status === 400) {
        // TODO: Should we rather throw TokenInvalidException() ?
        throw new TokenExpiredException();
      } else { throw err; }
    }
  }

}
