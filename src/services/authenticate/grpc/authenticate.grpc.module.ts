import { Module } from '@nestjs/common';
import { AuthenticateGrpcClient } from '@new-eden-social/services-authenticate/grpc/authenticate.grpc.client';

@Module({
  exports: [
    AuthenticateGrpcClient
  ]
})
export class AuthenticateGrpcModule {
}
