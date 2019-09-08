import { Module } from '@nestjs/common';
import { UniverseCategoryService } from './category.service';
import { ESIModule } from '@new-eden-social/esi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniverseCategoryRepository } from './category.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UniverseCategoryRepository]),
    ESIModule,
  ],
  providers: [
    UniverseCategoryService,
  ],
  exports: [UniverseCategoryService],
})
export class UniverseCategoryModule {
}
