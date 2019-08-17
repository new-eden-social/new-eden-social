import { Injectable, OnModuleInit } from '@nestjs/common';
import { AllianceGRPCClientOptions, IAllianceGrpcService } from '../..';
import { Client, ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class AllianceGrpcClient implements OnModuleInit {

  @Client(AllianceGRPCClientOptions)
  private readonly client: ClientGrpc;
  public service: IAllianceGrpcService;

  onModuleInit() {
    this.service = this.client.getService<IAllianceGrpcService>('AllianceService');
  }
}
