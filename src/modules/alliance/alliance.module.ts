import { forwardRef, Module } from '@nestjs/common';
import { AllianceService } from './alliance.service';
import { AllianceController } from './alliance.controller';
import { ESIModule } from '../core/external/esi/esi.module';
import { ZKillboardModule } from '../core/external/zkillboard/zkillboard.module';
import { CorporationModule } from '../corporation/corporation.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllianceRepository } from './alliance.repository';
import { FollowModule } from '../follow/follow.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AllianceRepository]),

    ZKillboardModule,
    ESIModule,
    forwardRef(() => CorporationModule),
    forwardRef(() => FollowModule),
  ],
  controllers: [
    AllianceController,
  ],
  providers: [
    AllianceService,
  ],
  exports: [
    AllianceService,
  ],
})
export class AllianceModule {
}
