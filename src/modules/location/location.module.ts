import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { locationProviders } from './location.providers';
import { DatabaseModule } from '../common/database/database.module';
import { ESIModule } from '../common/external/esi/esi.module';

@Module({
  modules: [
    DatabaseModule,
    ESIModule,
  ],
  components: [
    LocationService,
    ...locationProviders,
  ],
  exports: [LocationService],
})
export class LocationModule {
}
