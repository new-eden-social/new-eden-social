import { forwardRef, Module, RequestMethod } from '@nestjs/common';
import { CharactersController } from './character.controller';
import { CharacterService } from './character.service';
import { DatabaseModule } from '../database/database.module';
import { ZKillboardModule } from '../external/zkillboard/zkillboard.module';
import { ESIModule } from '../external/esi/esi.module';
import { characterProviders } from './character.providers';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { CharacterExistsMiddleware } from './character.exists.middleware';
import { CorporationModule } from '../corporation/corporation.module';

@Module({
  modules: [
    DatabaseModule,
    ZKillboardModule,
    ESIModule,
    forwardRef(() => CorporationModule),
  ],
  controllers: [
    CharactersController,
  ],
  components: [
    ...characterProviders,
    CharacterService,
  ],
  exports: [
    CharacterService,
  ],
})
export class CharacterModule {
  configure(consumer: MiddlewaresConsumer) {
    consumer.apply(CharacterExistsMiddleware)
    .forRoutes({
      path: 'characters/:characterId', method: RequestMethod.GET,
    });
  }
}
