import { Module } from '@nestjs/common';
import { ESIService } from './esi.service';

@Module({
  imports: [
  ],
  providers: [
    ESIService,
  ],
  exports: [
    ESIService,
  ],
})
export class ESIModule {
}
