import { Module, Shared } from '@nestjs/common';
import { CacheModule } from '../../cache/cache.module';
import { EveService } from './eve.service';

@Shared()
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
