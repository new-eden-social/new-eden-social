import { Module } from '@nestjs/common';
import { UniverseLocationService } from './location.service';
import { ESIModule } from '../../core/external/esi/esi.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniverseLocationRepository } from './location.repository';

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
