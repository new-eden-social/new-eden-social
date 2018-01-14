import { Module } from '@nestjs/common';
import { UpdaterService } from './updater.service';
import { CharacterModule } from '../character/character.module';
import { DatabaseModule } from '../common/database/database.module';
import { characterProviders } from '../character/character.providers';
import { CorporationModule } from '../corporation/corporation.module';
import { corporationProviders } from '../corporation/corporation.providers';
import { AllianceModule } from '../alliance/alliance.module';
import { allianceProviders } from '../alliance/alliance.providers';

@Module({
  modules: [
    CharacterModule,
    CorporationModule,
    AllianceModule,
    DatabaseModule,
  ],
  components: [
    ...characterProviders,
    ...corporationProviders,
    ...allianceProviders,
    UpdaterService,
  ],
})
export class UpdaterModule {
}
