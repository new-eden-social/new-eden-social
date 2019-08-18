import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { ESIModule } from '@new-eden-social/esi';
import { SearchrGrpcController } from './grpc/search.grpc.controller';

@Module({
  imports: [
    ESIModule,
  ],
  providers: [
    SearchService,
  ],
  controllers: [
    SearchrGrpcController,
  ]
})
export class SearchModule {
}
