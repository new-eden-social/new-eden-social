import { Module } from '@nestjs/common';
import { UniverseGrpcClient } from './universe.grpc.client';

@Module({
  exports: [
    UniverseGrpcClient
  ]
})
export class UniverseGrpcModule {
}
