import { Module } from '@nestjs/common';
import { PostGrpcClient } from '@new-eden-social/services-post/grpc/post.grpc.client';

@Module({
  exports: [
    PostGrpcClient,
  ]
})
export class PostGrpcModule {
}
