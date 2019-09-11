import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { ISearchGrpcService } from '@new-eden-social/services-search/grpc/search.grpc.interface';
import { SearchGrpcClientOptions } from '@new-eden-social/services-search/grpc/search.grpc.client.options';

@Injectable()
export class SearchGrpcClient implements OnModuleInit {

  @Client(SearchGrpcClientOptions)
  private readonly client: ClientGrpc;
  public service: ISearchGrpcService;

  onModuleInit() {
    this.service = this.client.getService<ISearchGrpcService>('SearchService');
  }
}
