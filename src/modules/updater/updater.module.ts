import { Module } from '@nestjs/common';
import { UpdaterService } from './updater.service';
import { CharactersModule } from '../character/character.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  modules: [
    CharactersModule,
    DatabaseModule,
  ],
  components: [
    UpdaterService,
  ],
})
export class UpdaterModule {
}
