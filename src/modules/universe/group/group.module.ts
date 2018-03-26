import { Module } from '@nestjs/common';
import { UniverseGroupService } from './group.service';
import { universeGroupProviders } from './group.providers';
import { DatabaseModule } from '../../core/database/database.module';
import { ESIModule } from '../../core/external/esi/esi.module';
import { UniverseCategoryModule } from '../category/category.module';

@Module({
  imports: [
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
