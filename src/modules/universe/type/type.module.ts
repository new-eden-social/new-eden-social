import { Module } from '@nestjs/common';
import { UniverseTypeService } from './type.service';
import { ESIModule } from '../../core/external/esi/esi.module';
import { UniverseGroupModule } from '../group/group.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniverseTypeRepository } from './type.repository';

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
