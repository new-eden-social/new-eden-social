import { Module } from '@nestjs/common';
import { HashtagGrpcController } from './hashtag.grpc.controller';

@Module({
  exports: [
    HashtagGrpcController
  ]
})
export class HashtagGrpcModule {
}
