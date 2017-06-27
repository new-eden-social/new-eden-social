import { Component } from '@nestjs/common';
import axios from 'axios';
import { CharacterStatistics, CorporationStatistics } from './zkillboard.interface';

@Component()
export class ZKillboardService {

  private static baseUrl = 'https://zkillboard.com/api/';
  private static userAgent = `eve-book/${process.env.npm_package_version} https://github.com/evebook/api`;

  /**
   * zKillboard client
   *
   * @type {AxiosInstance}
   */
  private static client = axios.create({
    baseURL: ZKillboardService.baseUrl,
    headers: { 'User-Agent': ZKillboardService.userAgent },
  });

  /**
   * Get corporation statistics from zKillboard
   *
   * @param id
   * @return {Promise<CorporationStatistics>}
   */
  public static async corporationStatistics(id: number): Promise<CorporationStatistics> {
    const response = await ZKillboardService.client.get(`stats/corporationID/${id}/`);
    return response.data;
  }

  /**
   * Get character statistics from zKillboard
   *
   * @param id
   * @return {Promise<CharacterStatistics>}
   */
  public static async characterStatistics(id: number): Promise<CharacterStatistics> {
    const response = await ZKillboardService.client.get(`stats/characterID/${id}/`);
    return response.data;
  }

}