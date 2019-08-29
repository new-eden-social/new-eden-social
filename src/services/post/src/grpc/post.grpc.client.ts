import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { IPostGrpcService } from './post.grpc.interface';
import { PostGrpcClientOptions } from './post.grpc.client.options';

@Injectable()
export class PostGrpcClient implements OnModuleInit {

  @Client(PostGrpcClientOptions)
  private readonly client: ClientGrpc;
  public service: IPostGrpcService;

  onModuleInit() {
    this.service = this.client.getService<IPostGrpcService>('PostService');
  }
}
