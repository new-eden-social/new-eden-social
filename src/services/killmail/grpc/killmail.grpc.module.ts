import { Module } from '@nestjs/common';
import { KillmailGrpcClient } from './killmail.grpc.client';

@Module({
  exports: [
    KillmailGrpcClient,
  ]
})
export class KillmailGrpcModule {
}
