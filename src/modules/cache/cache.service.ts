import { Component } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { createHash } from 'crypto';

@Component()
export class CacheService {

  private prefix = 'cache:';

  constructor(private redisService: RedisService) {
  }

  private formatKey(key: string) {
    return this.prefix + key
  }

  /**
   * Fetch cached item
   * @param key
   * @return {Promise<T>}
   */
  public async fetch<T>(key: string): Promise<T> {
    const data = await (await this.redisService.client).get(this.formatKey(key));

    return JSON.parse(data)
  }

  /**
   * Check if cached item exists
   * @param key
   * @return {Promise<boolean>}
   */
  public async exsists(key: string): Promise<boolean> {
    return await (await  this.redisService.client).exists(this.formatKey(key))
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
    return await (await this.redisService.client).setex(this.formatKey(key), expire, json)
  }

  /**
   * Create hash from parameters
   * @param args
   * @return {Promise<string>}
   */
  public async hash(...args): Promise<string> {
    const sha = createHash('sha1');
    sha.update(JSON.stringify(args));

    return sha.digest('hex')
  }

}
