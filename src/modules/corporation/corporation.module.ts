import { forwardRef, Module, RequestMethod } from '@nestjs/common';
import { CorporationController } from './corporation.controller';
import { CorporationService } from './corporation.service';
import { DatabaseModule } from '../common/database/database.module';
import { ZKillboardModule } from '../common/external/zkillboard/zkillboard.module';
import { ESIModule } from '../common/external/esi/esi.module';
import { corporationProviders } from './corporation.providers';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { CorporationExistsMiddleware } from './corporation.exists.middleware';
import { CharacterModule } from '../character/character.module';
import { AllianceModule } from '../alliance/alliance.module';

@Module({
  modules: [
    DatabaseModule,
    ZKillboardModule,
    ESIModule,
    forwardRef(() => CharacterModule),
    forwardRef(() => AllianceModule),
  ],
  controllers: [
    CorporationController,
  ],
  components: [
    ...corporationProviders,
    CorporationService,
  ],
  exports: [
    CorporationService,
  ],
})
export class CorporationModule {
  configure(consumer: MiddlewaresConsumer) {
    consumer.apply(CorporationExistsMiddleware)
    .forRoutes({
      path: 'corporations/:corporationId', method: RequestMethod.GET,
    });
  }
}
