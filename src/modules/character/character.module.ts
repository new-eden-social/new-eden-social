import { Module } from '@nestjs/common';
import { CharactersController } from './character.controller';
import { CharactersService } from './character.service';
import { DatabaseModule } from '../database/database.module';
import { DatabaseConfig } from '../database/database.config';
import { ZKillboardModule } from '../external/zkillboard/zkillboard.module';
import { ESIModule } from '../external/esi/esi.module';

@Module({
  modules: [
    DatabaseModule,
    ZKillboardModule,
    ESIModule,
  ],
  controllers: [
    CharactersController,
  ],
  components: [
    CharactersService,
    DatabaseConfig,
  ],
  exports: [
    CharactersService,
  ],
})
export class CharactersModule {
}
