import { Module } from '@nestjs/common';
import { CorporationGrpcClient } from './corporation.grpc.client';

@Module({
  exports: [
    CorporationGrpcClient,
  ]
})
export class CorporationGrpcModule {
}
