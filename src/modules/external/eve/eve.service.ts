import { Component } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { CacheService } from '../../cache/cache.service';
import { AllianceName, CharacterName, CorporationName, Search } from './eve.interface';

@Component()
export class EveService {

  private baseUrl = 'https://esi.tech.ccp.is/latest/';
  private userAgent = `eve-book/${process.env.npm_package_version} https://github.com/evebook/api`;
  private client: AxiosInstance;

  constructor(private cacheService: CacheService, authorization?: string) {
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'User-Agent': this.userAgent,
        'Accept': 'application/json',
      },
      params: { token: authorization },
    })
  }

  /**
   * Request wrapper, it stores response to cache and use it if it's not expired
   * @param config
   * @return {Promise<AxiosResponse>}
   */
  private async request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    const hash = await this.cacheService.hash(config);

    if (await this.cacheService.exsists(hash)) {
      return this.cacheService.fetch<AxiosResponse>(hash);
    }

    const response = await this.client.request(config);
    const cacheTime = parseInt(response.headers['access-control-max-age']);

    await this.cacheService.store(hash, response, cacheTime);

    return response
  }

  /**
   * Search for alliances, characters, corporations
   * @param query
   * @return {Promise<Search>}
   */
  public async search(query: string): Promise<Search> {
    const response = await this.request({
      url: 'search/',
      method: 'GET',
      params: {
        categories: ['alliance', 'character', 'corporation'],
        search: query,
      },
    });

    return response.data
  }

  /**
   * Get character names for ids
   * @param ids
   * @return {Promise<CharacterName>}
   */
  public async characterNames(ids: Array<number>): Promise<Array<CharacterName>> {
    const response = await this.request({
      url: 'character/names/',
      method: 'GET',
      params: {
        character_ids: ids,
      },
    });

    return response.data
  }

  /**
   * Get corporation names for ids
   * @param ids
   * @return {Promise<CorporationName>}
   */
  public async corporationNames(ids: Array<number>): Promise<Array<CorporationName>> {
    const response = await this.request({
      url: 'corporations/names/',
      method: 'GET',
      params: {
        corporation_ids: ids,
      },
    });

    return response.data
  }

  /**
   * Get alliance names for ids
   * @param ids
   * @return {Promise<AllianceName>}
   */
  public async allianceNames(ids: Array<number>): Promise<Array<AllianceName>> {
    const response = await this.request({
      url: 'alliances/names/',
      method: 'GET',
      params: {
        alliance_ids: ids,
      },
    });

    return response.data
  }

}
