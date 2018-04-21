import { Module } from '@nestjs/common';
import { UniverseLocationService } from './location.service';
import { universeLocationProviders } from './location.providers';
import { DatabaseModule } from '../../core/database/database.module';
import { ESIModule } from '../../core/external/esi/esi.module';

@Module({
  imports: [
    DatabaseModule,
    ESIModule,
  ],
  providers: [
    UniverseLocationService,
    ...universeLocationProviders,
  ],
  exports: [UniverseLocationService],
})
export class UniverseLocationModule {
}
