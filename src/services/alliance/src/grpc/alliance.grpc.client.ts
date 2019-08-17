import { Injectable, OnModuleInit } from '@nestjs/common';
import { AllianceGrpcClientOptions, IAllianceGrpcService } from '../..';
import { Client, ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class AllianceGrpcClient implements OnModuleInit {

  @Client(AllianceGrpcClientOptions)
  private readonly client: ClientGrpc;
  public service: IAllianceGrpcService;

  onModuleInit() {
    this.service = this.client.getService<IAllianceGrpcService>('AllianceService');
  }
}
