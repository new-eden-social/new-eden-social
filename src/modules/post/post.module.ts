import { MiddlewaresConsumer, Module, RequestMethod } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { DatabaseModule } from '../database/database.module';
import { AuthMiddleware } from '../authentication/authentication.middleware';
import { AuthenticationModule } from '../authentication/authentication.module';
import { CharacterModule } from '../character/character.module';
import { postProviders } from './post.providers';
import { CharacterExistsMiddleware } from '../character/character.exists.middleware';
import { CorporationModule } from '../corporation/corporation.module';
import { CorporationExistsMiddleware } from '../corporation/corporation.exists.middleware';

@Module({
  modules: [
    DatabaseModule,
    AuthenticationModule,
    CharacterModule,
    CorporationModule,
  ],
  controllers: [
    PostController,
  ],
  components: [
    ...postProviders,
    PostService,
  ],
  exports: [
    PostService,
  ],
})
export class PostModule {
  configure(consumer: MiddlewaresConsumer) {

    consumer.apply(AuthMiddleware)
    .forRoutes(
      { path: 'posts/character', method: RequestMethod.POST },
      { path: 'posts/corporation', method: RequestMethod.POST },
    );

    consumer.apply(CharacterExistsMiddleware)
    .forRoutes({
      path: 'posts/character/:characterId', method: RequestMethod.GET,
    });

    consumer.apply(CorporationExistsMiddleware)
    .forRoutes({
      path: 'posts/corporation/:corporationId', method: RequestMethod.GET,
    });
  }
}
