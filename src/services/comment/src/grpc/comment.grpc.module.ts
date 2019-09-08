import { Module } from '@nestjs/common';

@Module({
  exports: [
    CommentGrpcModule,
  ]
})
export class CommentGrpcModule {
}
