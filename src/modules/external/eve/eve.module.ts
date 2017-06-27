import { Module } from '@nestjs/common';
import { CacheModule } from '../../cache/cache.module';
import { EveService } from './eve.service';

@Module({
  modules: [
    CacheModule,
  ],
  components: [
    EveService,
  ],
  exports: [
    EveService,
  ],
})
export class EveModule {
}
