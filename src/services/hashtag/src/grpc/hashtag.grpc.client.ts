import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { HashtagGrpcClientOptions } from './hashtag.grpc.client.options';
import { IHashtagGrpcService } from './hashtag.grpc.interface';

@Injectable()
export class HashtagGrpcClient implements OnModuleInit {

  @Client(HashtagGrpcClientOptions)
  private readonly client: ClientGrpc;
  public service: IHashtagGrpcService;

  onModuleInit() {
    this.service = this.client.getService<IHashtagGrpcService>('HashtagService');
  }
}
