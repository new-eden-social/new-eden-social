import { Module } from '@nestjs/common';
import { ZKillboardService } from './zkillboard.service';

@Module({
  providers: [
    ZKillboardService,
  ],
  exports: [
    ZKillboardService,
  ],
})
export class ZKillboardModule {
}
