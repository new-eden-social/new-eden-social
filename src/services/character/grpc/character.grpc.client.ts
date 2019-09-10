import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { CharacterGrpcClientOptions } from '@new-eden-social/services-character/grpc/character.grpc.client.options';
import { ICharacterGrpcService } from '@new-eden-social/services-character/grpc/character.grpc.interface';

@Injectable()
export class CharacterGrpcClient implements OnModuleInit {

  @Client(CharacterGrpcClientOptions)
  private readonly client: ClientGrpc;
  public service: ICharacterGrpcService;

  onModuleInit() {
    this.service = this.client.getService<ICharacterGrpcService>('CharacterService');
  }
}
