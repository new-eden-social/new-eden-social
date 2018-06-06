import { Module } from '@nestjs/common';
import { CacheModule } from '../../cache/cache.module';
import { ZKillboardService } from './zkillboard.service';

@Module({
  imports: [
    CacheModule,
  ],
  providers: [
    ZKillboardService,
  ],
  exports: [
    ZKillboardService,
  ],
})
export class ZKillboardModule {
}
