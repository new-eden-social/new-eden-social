import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { IPostGrpcService } from '@new-eden-social/services-post/grpc/post.grpc.interface';
import { PostGrpcClientOptions } from '@new-eden-social/services-post/grpc/post.grpc.client.options';

@Injectable()
export class PostGrpcClient implements OnModuleInit {

  @Client(PostGrpcClientOptions)
  private readonly client: ClientGrpc;
  public service: IPostGrpcService;

  onModuleInit() {
    this.service = this.client.getService<IPostGrpcService>('PostService');
  }
}
