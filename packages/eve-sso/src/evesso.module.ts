import { Module } from '@nestjs/common';
import { EVESSOService } from './evesso.service';

@Module({
  providers: [
    EVESSOService,
  ],
  exports: [
    EVESSOService,
  ],
})
export class EVESSOModule {
}
