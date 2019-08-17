import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { FollowGRPCClientOptions } from './follow.grpc.client.options';
import { IFollowService } from './follow.grpc.interface';

@Injectable()
export class AllianceClient implements OnModuleInit {

  @Client(FollowGRPCClientOptions)
  private readonly client: ClientGrpc;
  public service: IFollowService;

  onModuleInit() {
    this.service = this.client.getService<IFollowService>('FollowService');
  }
}
