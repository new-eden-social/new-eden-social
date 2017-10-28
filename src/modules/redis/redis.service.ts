import { Component } from '@nestjs/common';
import { RedisConfig } from './redis.config';
import * as IORedis from 'ioredis';

function delay(milliseconds: number, count: number): Promise<number> {
  return new Promise<number>((resolve) => {
    setTimeout(
      () => {
        resolve(count);
      },
      milliseconds);
  });
}

@Component()
export class RedisService {

  /**
   * A Connection reference which is reused by all consumers of the redis service
   */
  private connection: IORedis.Redis;

  private pending: boolean;

  /**
   * Abstract injection so it is possible to use several databases
   * @param redisConfig
   */
  constructor(private readonly redisConfig: RedisConfig) {
  }

  /**
   * Get redis client
   * @return {Promise<IORedis.Redis>}
   */
  public get client(): Promise<IORedis.Redis> {
    return this.getConnection();
  }

  /**
   * An async getter for the Connection which creates the connection if needed.
   * @returns {Promise<IORedis.Redis>}
   */
  private async getConnection(): Promise<IORedis.Redis> {

    if (this.pending) {
      // Need to wait until previous call is resolved, otherwise will throw transaction error
      for (let i = 0; i < 500; i += 1) {
        if (!this.pending) {
          break;
        }
        await delay(50, i);
      }
    }

    // return the connection if it's been created already
    if (this.connection !== undefined) return Promise.resolve(this.connection);
    this.pending = true;
    // otherwise create it
    this.connection = await new IORedis(this.redisConfig.getConfiguration());
    this.pending = false;

    return this.connection;
  }
}
