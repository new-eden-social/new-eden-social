import { Module } from '@nestjs/common';
import { ImporterService } from './importer.service';
import { CharactersModule } from '../character/character.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  modules: [
    CharactersModule,
    DatabaseModule,
  ],
  components: [
    ImporterService,
  ],
})
export class ImporterModule {
}
