import { MiddlewaresConsumer, Module, RequestMethod, Shared } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { DatabaseModule } from '../../database/database.module';
import { DatabaseConfig } from '../../database/database.config';
import { AuthMiddleware } from '../../authentication/authentication.middleware';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { CharactersModule } from '../../character/character.module';

@Module({
  modules: [
    DatabaseModule,
    AuthenticationModule,
    CharactersModule,
  ],
  controllers: [
    PostController,
  ],
  components: [
    PostService,
  ],
  exports: [
    PostService,
  ],
})
export class PostModule {
  configure(consumer: MiddlewaresConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: 'posts', method: RequestMethod.POST,
    })
  }
}
