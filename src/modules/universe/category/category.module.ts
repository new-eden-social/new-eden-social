import { Module } from '@nestjs/common';
import { UniverseCategoryService } from './category.service';
import { universeCategoryProviders } from './category.providers';
import { DatabaseModule } from '../../common/database/database.module';
import { ESIModule } from '../../common/external/esi/esi.module';

@Module({
  modules: [
    DatabaseModule,
    ESIModule,
  ],
  components: [
    UniverseCategoryService,
    ...universeCategoryProviders,
  ],
  exports: [UniverseCategoryService],
})
export class UniverseCategoryModule {
}
