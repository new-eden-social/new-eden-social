import { Module } from '@nestjs/common';
import { SearchGrpcClient } from './search.grpc.client';

@Module({
  exports: [
    SearchGrpcClient,
  ]
})
export class SearchGrpcModule {
}
