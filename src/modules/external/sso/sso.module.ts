import { Module } from '@nestjs/common';
import { SSOService } from './sso.service';
import { CacheModule } from '../../cache/cache.module';

@Module({
  modules: [
    CacheModule,
  ],
  components: [
    SSOService,
  ],
  exports: [
    SSOService,
  ],
})
export class SSOModule {
}
