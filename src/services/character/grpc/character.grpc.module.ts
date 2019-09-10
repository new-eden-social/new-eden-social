import { Module } from '@nestjs/common';
import { CharacterGrpcClient } from '@new-eden-social/services-character/grpc/character.grpc.client';

@Module({
  exports: [
    CharacterGrpcClient
  ]
})
export class CharacterGrpcModule {
}
