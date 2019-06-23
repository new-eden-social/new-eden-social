import { forwardRef, Module } from '@nestjs/common';
import { CharactersController } from './character.controller';
import { CharacterService } from './character.service';
import { ZKillboardModule } from '@new-eden-social/zkillboard';
import { ESIModule } from '@new-eden-social/esi';
import { CorporationModule } from '../corporation/corporation.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterRepository } from './character.repository';
import { FollowModule } from '../follow/follow.module';
import { PostModule } from '../post/post.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CharacterRepository]),

    ZKillboardModule,
    ESIModule,
    forwardRef(() => CorporationModule),
    forwardRef(() => FollowModule),
    forwardRef(() => PostModule),
  ],
  controllers: [
    CharactersController,
  ],
  providers: [
    CharacterService,
  ],
  exports: [
    CharacterService,
  ],
})
export class CharacterModule {
}
