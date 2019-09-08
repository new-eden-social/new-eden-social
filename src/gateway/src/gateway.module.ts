import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerModule } from '@new-eden-social/logger';
import { SearchGrpcModule } from '@new-eden-social/api-search';
import { SearchController } from './search/search.controller';
import { AuthMiddleware } from './authentication/authentication.middleware';
import { PostGrpcModule } from '@new-eden-social/api-post';
import { CharacterGrpcModule } from '@new-eden-social/api-character';
import { CorporationGrpcModule } from '@new-eden-social/api-corporation';
import { AllianceGrpcModule } from '@new-eden-social/api-alliance';
import { CommentGrpcModule } from '@new-eden-social/api-comment';
import { FollowGrpcModule } from '@new-eden-social/api-follow';
import { MetascraperGrpcModule } from '@new-eden-social/api-metascraper';
import { UtilsModule } from '@new-eden-social/utils';
import { PostController } from './post/post.controller';
import { CommentController } from './comment/comment.controller';
import { MetascraperController } from './metascraper/metascraper.controller';
// import { FollowController } from './follow/follow.controller';
import { CharacterHttpController } from './character/character.http.controller';
import { CorporationHttpController } from './corporation/corporation.controller';
import { AllianceHttpController } from './alliance/alliance.http.controller';

@Module({
  imports: [
    UtilsModule,
    LoggerModule,

    CharacterGrpcModule,
    CorporationGrpcModule,
    AllianceGrpcModule,

    SearchGrpcModule,
    PostGrpcModule,
    CommentGrpcModule,
    FollowGrpcModule,
    MetascraperGrpcModule
  ],
  controllers: [
    SearchController,
    PostController,
    CommentController,
    // FollowController,
    MetascraperController,

    CharacterHttpController,
    CorporationHttpController,
    AllianceHttpController,
  ]
})
export class GatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .forRoutes('*');
  }
}