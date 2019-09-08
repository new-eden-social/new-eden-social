import { Module } from '@nestjs/common';
import { CharacterGrpcClient } from './character.grpc.client';

@Module({
  exports: [
    CharacterGrpcClient
  ]
})
export class CharacterGrpcModule {
}
