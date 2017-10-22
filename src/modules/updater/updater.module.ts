import { Module } from '@nestjs/common';
import { UpdaterService } from './updater.service';
import { CharacterModule } from '../character/character.module';
import { DatabaseModule } from '../database/database.module';
import { characterProviders } from '../character/character.providers';
import { CorporationModule } from '../corporation/corporation.module';
import { corporationProviders } from '../corporation/corporation.providers';

@Module({
  modules: [
    CharacterModule,
    CorporationModule,
    DatabaseModule,
  ],
  components: [
    ...characterProviders,
    ...corporationProviders,
    UpdaterService,
  ],
})
export class UpdaterModule {
}
