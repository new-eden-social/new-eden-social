import { Component } from '@nestjs/common';
import { RedisConfig } from './redis.config';
import { Redis } from 'ioredis';
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
  private connection: Redis;

  private pending: boolean;

  /**
   * Abstract injection so it is possible to use several databases
   * @param redisConfig
   */
  constructor(private readonly redisConfig: RedisConfig) {
  }

  /**
   * An async getter for the Connection which creates the connection if needed.
   * @returns {Promise<Redis>}
   */
  private async getConnection(): Promise<Redis> {

    if (this.pending) {
      // Need to wait untill previous call is resolved, otherwise will throw transaction error
      for (let i = 0; i < 500; i += 1) {
        if (!this.pending) {
          break;
        }
        await delay(50, i);
      }
    }

    // return the connection if it's been created already
    if (this.connection) return Promise.resolve(this.connection);
    this.pending = true;
    // otherwise create it
    this.connection = await new IORedis(this.redisConfig.getConfiguration());
    this.pending = false;

    return this.connection;
  }

  /**
   * Get redis client
   * @return {Promise<Redis>}
   */
  public get client(): Promise<Redis> {
    return this.getConnection();
  }
}
