import { Module, Shared } from '@nestjs/common';
import { CacheModule } from '../../cache/cache.module';
import { ZKillboardService } from './zkillboard.service';

@Shared()
@Module({
  modules: [
    CacheModule,
  ],
  components: [
    ZKillboardService,
  ],
  exports: [
    ZKillboardService,
  ],
})
export class ZKillboardModule {
}
