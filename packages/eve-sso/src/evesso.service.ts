import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { IAuthenticationResponse, IAuthenticationVerify } from './evesso.interface';
import { TokenExpiredException } from './evesso.exceptions';

@Injectable()
export class EVESSOService {

  private baseUrl = 'https://login.eveonline.com/oauth/';
  private userAgent = `@new-eden-social/eve-sso:${process.env.npm_package_version} https://github.com/new-eden-social/new-eden-social`;
  private client: AxiosInstance;

  private authenticationRedirect = <string>process.env.ESI_REDIRECT;
  private clientId = <string>process.env.ESI_CLIENT;
  private secretKey = <string>process.env.ESI_SECRET;
  private scope = <string>process.env.ESI_SCOPE;

  constructor() {
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'User-Agent': this.userAgent,
        Accept: 'application/json',
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
    const token = new Buffer(`${this.clientId}:${this.secretKey}`).toString('base64');
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
        Authorization: this.authorizationHeader,
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
        Authorization: this.authorizationHeader,
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
      }
      else throw err;
    }
  }

}
