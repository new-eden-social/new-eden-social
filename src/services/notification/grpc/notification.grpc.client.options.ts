import { GrpcOptions } from '@nestjs/common/interfaces/microservices/microservice-configuration.interface';
import { join } from 'path';

export const NotificationGrpcClientOptions: GrpcOptions = {
  options: {
    package: 'notification',
    protoPath: join(__dirname, 'notification.proto'),
  }
};
