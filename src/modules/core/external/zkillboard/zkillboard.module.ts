import { Module } from '@nestjs/common';
import { ZKillboardService } from './zkillboard.service';

@Module({
  imports: [
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
