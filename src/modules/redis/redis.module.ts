import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisConfig } from './redis.config';

@Module({
  components: [
    RedisService,
    RedisConfig,
  ],
  exports: [
    RedisService,
    RedisConfig,
  ],
})
export class RedisModule {
}
