import { Module, RequestMethod } from '@nestjs/common';
import { SearchModule } from './search/search.module';
import { CharacterModule } from './character/character.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { PostModule } from './post/post.module';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { RequestContextMiddleware } from './core/requestContext/requestContext.middleware';
import { AllianceModule } from './alliance/alliance.module';
import { CorporationModule } from './corporation/corporation.module';
import { LoggerModule } from './core/logger/logger.module';
import { UtilsModule } from './core/utils/utils.module';
import { CommentModule } from './comment/comment.module';
import { AuthMiddleware } from './authentication/authentication.middleware';
import apply = Reflect.apply;

@Module({
  imports: [
    // Global
    LoggerModule,
    UtilsModule,

    SearchModule,
    AllianceModule,
    CharacterModule,
    CorporationModule,
    PostModule,
    AuthenticationModule,
    CommentModule,
  ],
})
export class ApiModule {
  configure(consumer: MiddlewaresConsumer) {
    consumer
    .apply(RequestContextMiddleware)
    .forRoutes({ path: '*' })
    .apply(AuthMiddleware)
    .forRoutes(
      { path: 'posts/*' },
      { path: 'comments/*' },
      { path: 'characters/*' },
      { path: 'corporations/*' },
      { path: 'alliances/*' },
      { path: 'search/*' },
    );

  }
}
