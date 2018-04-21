import { Module } from '@nestjs/common';
import { UniverseTypeService } from './type.service';
import { universeTypeProviders } from './type.providers';
import { DatabaseModule } from '../../core/database/database.module';
import { ESIModule } from '../../core/external/esi/esi.module';
import { UniverseGroupModule } from '../group/group.module';

@Module({
  imports: [
    DatabaseModule,
    ESIModule,
    UniverseGroupModule,
  ],
  providers: [
    UniverseTypeService,
    ...universeTypeProviders,
  ],
  exports: [UniverseTypeService],
})
export class UniverseTypeModule {
}
