import { Module } from '@nestjs/common';
import { StatusController } from './status.controller';
import { ESIModule } from '../external/esi/esi.module';
import { StatusService } from './status.service';

@Module({
  imports: [
    ESIModule,
  ],
  providers: [
    StatusService,
  ],
  exports: [
    StatusService,
  ],
  controllers: [
    StatusController,
  ],
})
export class StatusModule {
}
