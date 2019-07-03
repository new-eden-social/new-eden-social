import { Module } from '@nestjs/common';
import { UniverseTypeService } from './type.service';
import { UniverseGroupModule } from '../group/group.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniverseTypeRepository } from './type.repository';
import { ESIModule } from '@new-eden-social/esi';

@Module({
  imports: [
    TypeOrmModule.forFeature([UniverseTypeRepository]),

    ESIModule,
    UniverseGroupModule,
  ],
  providers: [
    UniverseTypeService,
  ],
  exports: [UniverseTypeService],
})
export class UniverseTypeModule {
}
