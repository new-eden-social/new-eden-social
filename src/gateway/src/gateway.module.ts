import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerModule } from '@new-eden-social/logger';
import { SearchGrpcModule } from '@new-eden-social/api-search';
import { SearchController } from './search/search.controller';
import { AuthMiddleware } from './authentication/authentication.middleware';

@Module({
  imports: [
    LoggerModule,

    SearchGrpcModule,
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