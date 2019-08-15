import { Injectable, OnModuleInit } from '@nestjs/common';
import { AllianceGRPCClientOptions, IAllianceService } from '../..';
import { Client, ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class AllianceClient implements OnModuleInit {

  @Client(AllianceGRPCClientOptions)
  private readonly client: ClientGrpc;
  public service: IAllianceService;

  onModuleInit() {
    this.service = this.client.getService<IAllianceService>('AllianceService');
  }
}
