import { Module } from '@nestjs/common';
import { RedisModule } from '../redis/redis.module';
import { CacheService } from './cache.service';

@Module({
  imports: [
    RedisModule,
  ],
  components: [
    CacheService,
  ],
  exports: [
    CacheService,
  ],
})
export class CacheModule {
}
