import { Module } from '@nestjs/common';
import { UniverseGroupService } from './group.service';
import { ESIModule } from '../../core/external/esi/esi.module';
import { UniverseCategoryModule } from '../category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniverseGroupRepository } from './group.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UniverseGroupRepository]),
    ESIModule,
    UniverseCategoryModule,
  ],
  providers: [
    UniverseGroupService,
  ],
  exports: [UniverseGroupService],
})
export class UniverseGroupModule {
}
