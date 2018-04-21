import { MiddlewaresConsumer, Module, RequestMethod } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { DatabaseModule } from '../core/database/database.module';
import { AuthMiddleware } from '../authentication/authentication.middleware';
import { AuthenticationModule } from '../authentication/authentication.module';
import { CharacterModule } from '../character/character.module';
import { postProviders } from './post.providers';
import { CharacterExistsMiddleware } from '../character/character.exists.middleware';
import { CorporationModule } from '../corporation/corporation.module';
import { CorporationExistsMiddleware } from '../corporation/corporation.exists.middleware';
import { AllianceModule } from '../alliance/alliance.module';
import { AllianceExistsMiddleware } from '../alliance/alliance.exists.middleware';
import { HashtagModule } from '../hashtag/hashtag.module';
import { UniverseLocationModule } from '../universe/location/location.module';

@Module({
  imports: [
    DatabaseModule,
    AuthenticationModule,
    CharacterModule,
    CorporationModule,
    AllianceModule,
    HashtagModule,
    UniverseLocationModule,
  ],
  controllers: [
    PostController,
  ],
  providers: [
    ...postProviders,
    PostService,
  ],
  exports: [
    PostService,
  ],
})
export class PostModule {
  configure(consumer: MiddlewaresConsumer) {

    consumer.apply(CharacterExistsMiddleware)
    .forRoutes({
      path: 'posts/character/:characterId', method: RequestMethod.GET,
    });

    consumer.apply(CorporationExistsMiddleware)
    .forRoutes({
      path: 'posts/corporation/:corporationId', method: RequestMethod.GET,
    });

    consumer.apply(AllianceExistsMiddleware)
    .forRoutes({
      path: 'posts/alliance/:allianceId', method: RequestMethod.GET,
    });
  }
}
