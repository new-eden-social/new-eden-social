import { Global, Module } from '@nestjs/common';
import { UtilsService } from './utils.service';

@Global()
@Module({
  components: [
    UtilsService,
  ],
  exports: [
    UtilsService,
  ],
})
export class UtilsModule {
}
