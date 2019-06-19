import { Module } from '@nestjs/common';
import { SSOService } from './sso.service';

@Module({
  providers: [
    SSOService,
  ],
  exports: [
    SSOService,
  ],
})
export class SSOModule {
}
