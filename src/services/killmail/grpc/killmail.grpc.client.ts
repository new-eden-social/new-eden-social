import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { KillmailGrpcClientOptions } from './killmail.grpc.client.options';
import { IKillmailGrpcService } from './killmail.grpc.interface';

@Injectable()
export class KillmailGrpcClient implements OnModuleInit {

  @Client(KillmailGrpcClientOptions)
  private readonly client: ClientGrpc;
  public service: IKillmailGrpcService;

  onModuleInit() {
    this.service = this.client.getService<IKillmailGrpcService>('KillmailService');
  }
}
