import { Module } from '@nestjs/common';
import { redisProviders } from './redis.providers';

@Module({
  components: [...redisProviders],
  exports: [...redisProviders],
})
export class RedisModule {
}
