import { GrpcOptions } from '@nestjs/common/interfaces/microservices/microservice-configuration.interface';
import { join } from 'path';

export const FollowGRPCClientOptions: GrpcOptions = {
  options: {
    package: 'follow',
    protoPath: join(__dirname, 'follow.proto'),
  }
};
