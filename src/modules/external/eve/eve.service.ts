import { Component } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { CacheService } from '../../cache/cache.service';
import { AllianceName, CharacterName, CorporationName, Search } from './eve.interface';

@Component()
export class EveService {

  private baseUrl = 'https://esi.tech.ccp.is/latest/';
  private userAgent = `eve-book/${process.env.npm_package_version} https://github.com/evebook/api`;
  private client: AxiosInstance;

  constructor(private cacheService: CacheService) {
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'User-Agent': this.userAgent,
        'Accept': 'application/json',
      },
      //
      //params: { token: '' },
    })
  }

  /**
   * Request wrapper, it stores response to cache and use it if it's not expired
   * @param config
   * @return {Promise<T>}
   */
  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    const hash = await this.cacheService.hash(config);

    if (await this.cacheService.exsists(hash)) {
      return this.cacheService.fetch<T>(hash);
    }

    const response = await this.client.request(config);
    const cacheTime = parseInt(response.headers['access-control-max-age']);

    await this.cacheService.store(hash, response.data, cacheTime);

    return response.data

  }

  /**
   * Search for alliances, characters, corporations
   * @param query
   * @return {Promise<Search>}
   */
  public async search(query: string): Promise<Search> {
    return this.request<Search>({
      url: 'search/',
      method: 'GET',
      params: {
        categories: ['alliance', 'character', 'corporation'].join(','),
        search: query,
      },
    });
  }

  /**
   * Get character names for ids
   * @param ids
   * @return {Promise<CharacterName>}
   */
  public async characterNames(ids: Array<number>): Promise<Array<CharacterName>> {
    return this.request<Array<CharacterName>>({
      url: 'characters/names/',
      method: 'GET',
      params: {
        character_ids: ids.join(','),
      },
    });
  }

  /**
   * Get corporation names for ids
   * @param ids
   * @return {Promise<CorporationName>}
   */
  public async corporationNames(ids: Array<number>): Promise<Array<CorporationName>> {
    return this.request<Array<CorporationName>>({
      url: 'corporations/names/',
      method: 'GET',
      params: {
        corporation_ids: ids.join(','),
      },
    });
  }

  /**
   * Get alliance names for ids
   * @param ids
   * @return {Promise<AllianceName>}
   */
  public async allianceNames(ids: Array<number>): Promise<Array<AllianceName>> {
    return this.request<Array<AllianceName>>({
      url: 'alliances/names/',
      method: 'GET',
      params: {
        alliance_ids: ids.join(','),
      },
    });
  }

}
