import { Module } from '@nestjs/common';
import { MetascraperGrpcClient } from './metascraper.grpc.client';

@Module({
  exports: [
    MetascraperGrpcClient,
  ]
})
export class MetascraperGrpcModule {
}
