import { Module } from '@nestjs/common';
import { PostGrpcClient } from './post.grpc.client';

@Module({
  exports: [
    PostGrpcClient,
  ]
})
export class PostGrpcModule {
}
