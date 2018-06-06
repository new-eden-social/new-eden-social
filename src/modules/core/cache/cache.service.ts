import { Injectable, Inject } from '@nestjs/common';
import { REDIS_CONNECTION_TOKEN } from '../redis/redis.constants';
import * as IORedis from 'ioredis';

@Injectable()
export class CacheService {

  private prefix = 'cache:';

  constructor(@Inject(REDIS_CONNECTION_TOKEN) private redisClient: IORedis.Redis) {
  }

  /**
   * Fetch cached item
   * @param key
   * @return {Promise<T>}
   */
  public async fetch<T>(key: string): Promise<T> {
    const data = await this.redisClient.get(this.formatKey(key));

    return JSON.parse(data);
  }

  /**
   * Check if cached item exists
   * @param key
   * @return {Promise<boolean>}
   */
  public async exists(key: string): Promise<boolean> {
    return await this.redisClient.exists(this.formatKey(key));
  }

  /**
   * Store new item to cache
   * @param key
   * @param data
   * @param expire
   * @return {Promise<any>}
   */
  public async store(key: string, data: any, expire: number = 600): Promise<any> {
    const json = JSON.stringify(data);
    return await this.redisClient.setex(this.formatKey(key), expire, json);
  }

  private formatKey(key: string) {
    return this.prefix + key;
  }

}
