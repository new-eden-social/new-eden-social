import { forwardRef, Module } from '@nestjs/common';
import { CorporationController } from './corporation.controller';
import { CorporationService } from './corporation.service';
import { ZKillboardModule } from '@new-eden-social/zkillboard';
import { ESIModule } from '@new-eden-social/esi';
import { CharacterModule } from '../character/character.module';
import { AllianceModule } from '../alliance/alliance.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CorporationRepository } from './corporation.repository';
import { FollowModule } from '../follow/follow.module';
import { PostModule } from '../post/post.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CorporationRepository]),

    ZKillboardModule,
    ESIModule,
    forwardRef(() => CharacterModule),
    forwardRef(() => AllianceModule),
    forwardRef(() => FollowModule),
    forwardRef(() => PostModule),
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
