import { forwardRef, Module, RequestMethod } from '@nestjs/common';
import { CharactersController } from './character.controller';
import { CharacterService } from './character.service';
import { DatabaseModule } from '../core/database/database.module';
import { ZKillboardModule } from '../core/external/zkillboard/zkillboard.module';
import { ESIModule } from '../core/external/esi/esi.module';
import { characterProviders } from './character.providers';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { CharacterExistsMiddleware } from './character.exists.middleware';
import { CorporationModule } from '../corporation/corporation.module';

@Module({
  imports: [
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
