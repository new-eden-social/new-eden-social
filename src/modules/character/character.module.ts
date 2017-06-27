import { Module } from '@nestjs/common';
import { CharactersController } from './character.controller';
import { CharactersService } from './character.service';
import { DatabaseModule } from '../database/database.module';
import { DatabaseConfig } from  '../database/database.config';

@Module({
  modules: [
    DatabaseModule,
  ],
  controllers: [
    CharactersController,
  ],
  components: [
    CharactersService,
    DatabaseConfig,
  ],
})
export class CharactersModule {
}
