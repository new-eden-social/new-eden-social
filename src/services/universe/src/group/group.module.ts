import { Module } from '@nestjs/common';
import { UniverseGroupService } from './group.service';
import { UniverseCategoryModule } from '../category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniverseGroupRepository } from './group.repository';
import { ESIModule } from '@new-eden-social/esi';

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
