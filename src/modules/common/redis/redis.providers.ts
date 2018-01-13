import * as IORedis from 'ioredis';
import { REDIS_CONNECTION_TOKEN } from './redis.constants';

export const redisProviders = [
  {
    provide: REDIS_CONNECTION_TOKEN,
    useFactory: () => {
      if (process.env.REDIS_URL)
        return new IORedis(process.env.REDIS_URL);

      return new IORedis(<IORedis.RedisOptions>{
        port: parseInt(process.env.REDIS_PORT, 10),
        host: process.env.REDIS_HOST,
      });
    },
  },
];
