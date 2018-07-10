import { Module } from '@nestjs/common';
import { SSOService } from './sso.service';

@Module({
  imports: [
  ],
  providers: [
    SSOService,
  ],
  exports: [
    SSOService,
  ],
})
export class SSOModule {
}
