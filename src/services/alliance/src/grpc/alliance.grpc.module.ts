import { Module } from '@nestjs/common';
import { AllianceGrpcClient } from './alliance.grpc.client';

@Module({
  exports: [
    AllianceGrpcClient
  ]
})
export class AllianceGrpcModule {
}
