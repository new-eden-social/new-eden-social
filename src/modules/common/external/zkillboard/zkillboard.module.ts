import { Module } from '@nestjs/common';
import { CacheModule } from '../../cache/cache.module';
import { ZKillboardService } from './zkillboard.service';

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
