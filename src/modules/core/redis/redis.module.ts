import { Module } from '@nestjs/common';
import { redisProviders } from './redis.providers';

@Module({
  providers: [...redisProviders],
  exports: [...redisProviders],
})
export class RedisModule {
}
