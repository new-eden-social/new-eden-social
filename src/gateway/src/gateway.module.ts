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

@Module({
  imports: [
    LoggerModule,

    CharacterGrpcModule,
    CorporationGrpcModule,
    AllianceGrpcModule,

    SearchGrpcModule,
    PostGrpcModule,
    CommentGrpcModule,
  ],
  controllers: [
    SearchController,
  ]
})
export class GatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .forRoutes('*');
  }
}