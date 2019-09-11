import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { UniverseGrpcClientOptions } from '@new-eden-social/services-universe/grpc/universe.grpc.client.options';
import { IUniverseGrpcService } from '@new-eden-social/services-universe/grpc/universe.grpc.interface';

@Injectable()
export class UniverseGrpcClient implements OnModuleInit {

  @Client(UniverseGrpcClientOptions)
  private readonly client: ClientGrpc;
  public service: IUniverseGrpcService;

  onModuleInit() {
    this.service = this.client.getService<IUniverseGrpcService>('UniverseService');
  }
}
