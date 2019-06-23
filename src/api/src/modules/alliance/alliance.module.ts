import { forwardRef, Module } from '@nestjs/common';
import { AllianceService } from './alliance.service';
import { AllianceController } from './alliance.controller';
import { ESIModule } from '@new-eden-social/esi';
import { ZKillboardModule } from '@new-eden-social/zkillboard';
import { CorporationModule } from '../corporation/corporation.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllianceRepository } from './alliance.repository';
import { FollowModule } from '../follow/follow.module';
import { PostModule } from '../post/post.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AllianceRepository]),

    ZKillboardModule,
    ESIModule,
    forwardRef(() => CorporationModule),
    forwardRef(() => FollowModule),
    forwardRef(() => PostModule),
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
