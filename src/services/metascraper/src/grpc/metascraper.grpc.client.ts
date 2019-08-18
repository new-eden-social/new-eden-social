import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { IMetascraperGrpcService } from './metascraper.grpc.interface';
import { MetascraperGrpcClientOptions } from './metascraper.grpc.client.options';

@Injectable()
export class MetascraperGrpcClient implements OnModuleInit {

  @Client(MetascraperGrpcClientOptions)
  private readonly client: ClientGrpc;
  public service: IMetascraperGrpcService;

  onModuleInit() {
    this.service = this.client.getService<IMetascraperGrpcService>('MetscraperService');
  }
}
