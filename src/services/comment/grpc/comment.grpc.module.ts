import { Module } from '@nestjs/common';
import { CommentGrpcClient } from '@new-eden-social/services-comment/grpc/comment.grpc.client';

@Module({
  exports: [
    CommentGrpcClient,
  ]
})
export class CommentGrpcModule {
}
