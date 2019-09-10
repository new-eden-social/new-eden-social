import { Module } from '@nestjs/common';
import { AllianceGrpcClient } from '@new-eden-social/services-alliance/grpc/alliance.grpc.client';

@Module({
  exports: [
    AllianceGrpcClient
  ]
})
export class AllianceGrpcModule {
}
