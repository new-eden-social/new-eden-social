import { forwardRef, Module, RequestMethod } from '@nestjs/common';
import { CorporationController } from './corporation.controller';
import { CorporationService } from './corporation.service';
import { DatabaseModule } from '../database/database.module';
import { ZKillboardModule } from '../external/zkillboard/zkillboard.module';
import { ESIModule } from '../external/esi/esi.module';
import { corporationProviders } from './corporation.providers';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { CorporationExistsMiddleware } from './corporation.exists.middleware';
import { CharacterModule } from '../character/character.module';

@Module({
  modules: [
    DatabaseModule,
    ZKillboardModule,
    ESIModule,
    forwardRef(() => CharacterModule),
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
