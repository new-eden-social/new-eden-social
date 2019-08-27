import { Module } from '@nestjs/common';
import { LoggerModule } from '@new-eden-social/logger';
import { SearchGrpcModule } from '@new-eden-social/api-search';
import { SearchController } from './search/search.controller';

@Module({
  imports: [
    LoggerModule,

    SearchGrpcModule,
  ],
  controllers: [
    SearchController,
  ]
})
export class GatewayModule {
}
