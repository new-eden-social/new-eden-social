import { Module } from '@nestjs/common';
import { UpdaterService } from './updater.service';
import { CharacterModule } from '../character/character.module';
import { DatabaseModule } from '../database/database.module';
import { characterProviders } from '../character/character.providers';

@Module({
  modules: [
    CharacterModule,
    DatabaseModule,
  ],
  components: [
    ...characterProviders,
    UpdaterService,
  ],
})
export class UpdaterModule {
}
