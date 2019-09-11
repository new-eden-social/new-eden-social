import { Module } from '@nestjs/common';
import { UniverseGrpcClient } from '@new-eden-social/services-universe/grpc/universe.grpc.client';

@Module({
  exports: [
    UniverseGrpcClient
  ]
})
export class UniverseGrpcModule {
}
