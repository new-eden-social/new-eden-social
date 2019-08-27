import { Module } from '@nestjs/common';
import { AuthenticateGrpcClient } from './authenticate.grpc.client';

@Module({
  exports: [
    AuthenticateGrpcClient
  ]
})
export class AuthenticateGrpcModule {
}
