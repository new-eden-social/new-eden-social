import { Module } from '@nestjs/common';
import { SearchModule } from './search/search.module';
import { CharacterModule } from './character/character.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { PostModule } from './post/post.module';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { RequestContextMiddleware } from './requestContext/requestContext.middleware';

@Module({
  modules: [
    SearchModule,
    CharacterModule,
    AuthenticationModule,
    PostModule,
  ],
})
export class ApplicationModule {
  configure(consumer: MiddlewaresConsumer) {
    consumer
    .apply(RequestContextMiddleware)
    .forRoutes({ path: '*' });
  }
}
