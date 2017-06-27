import { Component } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  AllianceStatistics, CharacterStatistics,
  CorporationStatistics,
} from './zkillboard.interface';
import { CacheService } from '../../cache/cache.service';

@Component()
export class ZKillboardService {

  private baseUrl = 'https://zkillboard.com/api/';
  private userAgent = `eve-book/${process.env.npm_package_version} https://github.com/evebook/api`;
  private client: AxiosInstance;

  constructor(private cacheService: CacheService) {
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: { 'User-Agent': this.userAgent },
    });
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
    // const cacheTime = parseInt(response.headers['access-control-max-age']);
    const cacheTime = 3600;

    await this.cacheService.store(hash, response.data, cacheTime);

    return response.data;
  }

  /**
   * Get alliance statistics from zKillboard
   *
   * @param id
   * @return {Promise<CorporationStatistics>}
   */
  public async allianceStatistics(id: number): Promise<AllianceStatistics> {
    return this.request<AllianceStatistics>({
      url: `stats/allianceID/${id}/`,
      method: 'GET',
    });
  }

  /**
   * Get corporation statistics from zKillboard
   *
   * @param id
   * @return {Promise<CorporationStatistics>}
   */
  public async corporationStatistics(id: number): Promise<CorporationStatistics> {
    return this.request<CorporationStatistics>({
      url: `stats/corporationID/${id}/`,
      method: 'GET',
    });
  }

  /**
   * Get character statistics from zKillboard
   *
   * @param id
   * @return {Promise<CharacterStatistics>}
   */
  public async characterStatistics(id: number): Promise<CharacterStatistics> {
    return this.request<CharacterStatistics>({
      url: `stats/characterID/${id}/`,
      method: 'GET',
    });
  }

}
