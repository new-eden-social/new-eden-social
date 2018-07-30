import { forwardRef, Module } from '@nestjs/common';
import { CorporationController } from './corporation.controller';
import { CorporationService } from './corporation.service';
import { ZKillboardModule } from '../core/external/zkillboard/zkillboard.module';
import { ESIModule } from '../core/external/esi/esi.module';
import { CharacterModule } from '../character/character.module';
import { AllianceModule } from '../alliance/alliance.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CorporationRepository } from './corporation.repository';
import { FollowModule } from '../follow/follow.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CorporationRepository]),

    ZKillboardModule,
    ESIModule,
    forwardRef(() => CharacterModule),
    forwardRef(() => AllianceModule),
    forwardRef(() => FollowModule),
  ],
  controllers: [
    CorporationController,
  ],
  providers: [
    CorporationService,
  ],
  exports: [
    CorporationService,
  ],
})
export class CorporationModule {
}
