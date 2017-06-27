import { Component } from '@nestjs/common';
import { RedisOptions } from 'ioredis';

@Component()
export class RedisConfig {
  public getConfiguration(): RedisOptions {
    return {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    };
  }
}
