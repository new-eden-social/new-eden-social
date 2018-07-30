import { forwardRef, Module } from '@nestjs/common';
import { CharactersController } from './character.controller';
import { CharacterService } from './character.service';
import { ZKillboardModule } from '../core/external/zkillboard/zkillboard.module';
import { ESIModule } from '../core/external/esi/esi.module';
import { CorporationModule } from '../corporation/corporation.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterRepository } from './character.repository';
import { FollowModule } from '../follow/follow.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CharacterRepository]),

    ZKillboardModule,
    ESIModule,
    forwardRef(() => CorporationModule),
    forwardRef(() => FollowModule),
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
