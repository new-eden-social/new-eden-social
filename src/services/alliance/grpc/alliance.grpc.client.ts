import { Injectable, OnModuleInit } from '@nestjs/common';
import { IAllianceGrpcService } from '@new-eden-social/services-alliance/grpc/alliance.grpc.interface';
import { AllianceGrpcClientOptions } from '@new-eden-social/services-alliance/grpc/alliance.grpc.client.options';
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
