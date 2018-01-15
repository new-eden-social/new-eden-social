import { Module } from '@nestjs/common';
import { UniverseLocationService } from './location.service';
import { universeLocationProviders } from './location.providers';
import { DatabaseModule } from '../../common/database/database.module';
import { ESIModule } from '../../common/external/esi/esi.module';

@Module({
  modules: [
    DatabaseModule,
    ESIModule,
  ],
  components: [
    UniverseLocationService,
    ...universeLocationProviders,
  ],
  exports: [UniverseLocationService],
})
export class UniverseLocationModule {
}
