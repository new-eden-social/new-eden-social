import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { UniverseGrpcClientOptions } from './universe.grpc.client.options';
import { IUniverseGrpcService } from './universe.grpc.interface';

@Injectable()
export class UniverseGrpcClient implements OnModuleInit {

  @Client(UniverseGrpcClientOptions)
  private readonly client: ClientGrpc;
  public service: IUniverseGrpcService;

  onModuleInit() {
    this.service = this.client.getService<IUniverseGrpcService>('UniverseService');
  }
}
