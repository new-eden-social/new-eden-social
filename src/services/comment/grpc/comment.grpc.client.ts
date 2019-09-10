import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { ICommentGrpcService } from './comment.grpc.interface';
import { CommentGrpcClientOptions } from './comment.grpc.client.options';

@Injectable()
export class CommentGrpcClient implements OnModuleInit {

  @Client(CommentGrpcClientOptions)
  private readonly client: ClientGrpc;
  public service: ICommentGrpcService;

  onModuleInit() {
    this.service = this.client.getService<ICommentGrpcService>('CommentService');
  }
}
