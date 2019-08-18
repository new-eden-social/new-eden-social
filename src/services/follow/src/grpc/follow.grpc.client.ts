import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { IFollowGrpcService } from './follow.grpc.interface';
import { FollowGrpcClientOptions } from './follow.grpc.client.options';

@Injectable()
export class FollowGrpcClient implements OnModuleInit {

  @Client(FollowGrpcClientOptions)
  private readonly client: ClientGrpc;
  public service: IFollowGrpcService;

  onModuleInit() {
    this.service = this.client.getService<IFollowGrpcService>('FollowService');
  }
}
