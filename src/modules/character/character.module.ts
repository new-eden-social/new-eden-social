import { Module, Shared } from '@nestjs/common';
import { CharactersController } from './character.controller';
import { CharactersService } from './character.service';
import { DatabaseModule } from '../database/database.module';
import { DatabaseConfig } from '../database/database.config';
import { ESIModule } from '../external/esi/esi.module';
import { ZKillboardModule } from '../external/zkillboard/zkillboard.module';
import { PostModule } from '../feed/post/post.module';

@Module({
  modules: [
    DatabaseModule,
    ESIModule,
    ZKillboardModule,
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
