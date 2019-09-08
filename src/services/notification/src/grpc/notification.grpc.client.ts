import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { NotificationGrpcClientOptions } from './notification.grpc.client.options';
import { INotificationGrpcService } from './notification.grpc.interface';

@Injectable()
export class NotificationGrpcClient implements OnModuleInit {

  @Client(NotificationGrpcClientOptions)
  private readonly client: ClientGrpc;
  public service: INotificationGrpcService;

  onModuleInit() {
    this.service = this.client.getService<INotificationGrpcService>('NotificationService');
  }
}
