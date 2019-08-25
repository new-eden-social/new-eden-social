import { Module } from '@nestjs/common';
import { NotificationGrpcClient } from './notification.grpc.client';

@Module({
  exports: [
    NotificationGrpcClient
  ]
})
export class NotificationGrpcModule {
}
