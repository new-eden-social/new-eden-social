import { Module } from '@nestjs/common';
import { HashtagGrpcController } from '@new-eden-social/services-hashtag/grpc/hashtag.grpc.controller';

@Module({
  exports: [
    HashtagGrpcController
  ]
})
export class HashtagGrpcModule {
}
