import { Module } from '@nestjs/common';
import { FollowGrpcClient } from './follow.grpc.client';

@Module({
  exports: [
    FollowGrpcClient
  ]
})
export class FollowGrpcModule {
}
