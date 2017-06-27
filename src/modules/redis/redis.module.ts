import { Module, Shared } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisConfig } from './redis.config';

@Shared()
@Module({
  components: [
    RedisService,
    RedisConfig,
  ],
  exports: [RedisService],
})
export class RedisModule {
}
