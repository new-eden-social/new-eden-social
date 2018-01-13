import { Module } from '@nestjs/common';
import { CacheModule } from '../../cache/cache.module';
import { ESIService } from './esi.service';

@Module({
  modules: [
    CacheModule,
  ],
  components: [
    ESIService,
  ],
  exports: [
    ESIService,
  ],
})
export class ESIModule {
}
