import { Module } from '@nestjs/common';
import { UniverseGroupService } from './group.service';
import { universeGroupProviders } from './group.providers';
import { DatabaseModule } from '../../common/database/database.module';
import { ESIModule } from '../../common/external/esi/esi.module';
import { UniverseCategoryModule } from '../category/category.module';

@Module({
  modules: [
    DatabaseModule,
    ESIModule,
    UniverseCategoryModule,
  ],
  components: [
    UniverseGroupService,
    ...universeGroupProviders,
  ],
  exports: [UniverseGroupService],
})
export class UniverseGroupModule {
}
