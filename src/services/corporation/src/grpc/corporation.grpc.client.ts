import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { ICorporationGrpcService } from './corporation.grpc.interface';
import { CorporationGrpcClientOptions } from './corporation.grpc.client.options';

@Injectable()
export class CorporationGrpcClient implements OnModuleInit {

  @Client(CorporationGrpcClientOptions)
  private readonly client: ClientGrpc;
  public service: ICorporationGrpcService;

  onModuleInit() {
    this.service = this.client.getService<ICorporationGrpcService>('CorporationService');
  }
}
