import { Module } from '@nestjs/common';
import { UniverseLocationService } from './location.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniverseLocationRepository } from './location.repository';
import { ESIModule } from '@new-eden-social/esi';

@Module({
  imports: [
    TypeOrmModule.forFeature([UniverseLocationRepository]),
    ESIModule,
  ],
  providers: [
    UniverseLocationService,
  ],
  exports: [UniverseLocationService],
})
export class UniverseLocationModule {
}
