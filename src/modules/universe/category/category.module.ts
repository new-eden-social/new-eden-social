import { Module } from '@nestjs/common';
import { UniverseCategoryService } from './category.service';
import { universeCategoryProviders } from './category.providers';
import { DatabaseModule } from '../../core/database/database.module';
import { ESIModule } from '../../core/external/esi/esi.module';

@Module({
  imports: [
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
