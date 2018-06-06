import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  IAllianceStatistics,
  ICharacterStatistics,
  ICorporationStatistics,
} from './zkillboard.interface';
import { CacheService } from '../../cache/cache.service';
import { UtilsService } from '../../utils/utils.service';

@Injectable()
export class ZKillboardService {

  private baseUrl = 'https://zkillboard.com/api/';
  private userAgent = `eve-book/${process.env.npm_package_version} https://github.com/evebook/api`;
  private client: AxiosInstance;

  constructor(
    private cacheService: CacheService,
    private utilsService: UtilsService,
    ) {
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: { 'User-Agent': this.userAgent },
    });
  }

  /**
   * Create Kill URL
   * @param {number} killId
   * @return {string}
   */
  public static createKillUrl(killId: number): string {
    return `https://zkillboard.com/kill/${killId}`;
  }

  /**
   * Get alliance statistics from zKillboard
   *
   * @param id
   * @return {Promise<ICorporationStatistics>}
   */
  public async allianceStatistics(id: number): Promise<IAllianceStatistics> {
    return this.request<IAllianceStatistics>({
      url: `stats/allianceID/${id}/`,
      method: 'GET',
    });
  }

  /**
   * Get corporation statistics from zKillboard
   *
   * @param id
   * @return {Promise<ICorporationStatistics>}
   */
  public async corporationStatistics(id: number): Promise<ICorporationStatistics> {
    return this.request<ICorporationStatistics>({
      url: `stats/corporationID/${id}/`,
      method: 'GET',
    });
  }

  /**
   * Get character statistics from zKillboard
   *
   * @param id
   * @return {Promise<ICharacterStatistics>}
   */
  public async characterStatistics(id: number): Promise<ICharacterStatistics> {
    return this.request<ICharacterStatistics>({
      url: `stats/characterID/${id}/`,
      method: 'GET',
    });
  }

  /**
   * Request wrapper, it stores response to cache and use it if it's not expired
   * @param config
   * @return {Promise<T>}
   */
  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    const hash = await this.utilsService.hash(config);

    if (await this.cacheService.exists(hash)) {
      return this.cacheService.fetch<T>(hash);
    }

    const response = await this.client.request(config);
    // const cacheTime = parseInt(response.headers['access-control-max-age']);
    const cacheTime = 3600;

    await this.cacheService.store(hash, response.data, cacheTime);

    return response.data;
  }
}
