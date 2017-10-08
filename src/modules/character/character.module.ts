import { Module, RequestMethod } from '@nestjs/common';
import { CharactersController } from './character.controller';
import { CharactersService } from './character.service';
import { DatabaseModule } from '../database/database.module';
import { ZKillboardModule } from '../external/zkillboard/zkillboard.module';
import { ESIModule } from '../external/esi/esi.module';
import { characterProviders } from './character.providers';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { CharacterExistsMiddleware } from './character.exists.middleware';

@Module({
  modules: [
    DatabaseModule,
    ZKillboardModule,
    ESIModule,
  ],
  controllers: [
    CharactersController,
  ],
  components: [
    ...characterProviders,
    CharactersService,
  ],
  exports: [
    CharactersService,
  ],
})
export class CharactersModule {
  configure(consumer: MiddlewaresConsumer) {
    consumer.apply(CharacterExistsMiddleware)
    .forRoutes({
      path: 'characters/:characterId', method: RequestMethod.GET,
    });
  }
}
