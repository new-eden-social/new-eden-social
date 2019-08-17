import { Module } from '@nestjs/common';
import { FollowGRPCClient } from './follow.grpc.client';

@Module({
  exports: [
    FollowGRPCClient
  ]
})
export class FollowGRPCModule {
}
