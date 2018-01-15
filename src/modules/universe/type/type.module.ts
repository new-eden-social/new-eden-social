import { Module } from '@nestjs/common';
import { UniverseTypeService } from './type.service';
import { universeTypeProviders } from './type.providers';
import { DatabaseModule } from '../../common/database/database.module';
import { ESIModule } from '../../common/external/esi/esi.module';
import { UniverseGroupModule } from '../group/group.module';

@Module({
  modules: [
    DatabaseModule,
    ESIModule,
    UniverseGroupModule,
  ],
  components: [
    UniverseTypeService,
    ...universeTypeProviders,
  ],
  exports: [UniverseTypeService],
})
export class UniverseTypeModule {
}
