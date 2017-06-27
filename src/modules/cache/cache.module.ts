import { Module, Shared } from '@nestjs/common';
import { RedisModule } from '../redis/redis.module';
import { CacheService } from './cache.service';

@Shared()
@Module({
  modules: [
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
