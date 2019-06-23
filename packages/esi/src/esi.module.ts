import { Module } from '@nestjs/common';
import { ESIService } from './esi.service';

@Module({
  providers: [
    ESIService,
  ],
  exports: [
    ESIService,
  ],
})
export class ESIModule {
}
