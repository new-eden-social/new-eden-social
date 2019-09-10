import { GrpcOptions } from '@nestjs/common/interfaces/microservices/microservice-configuration.interface';
import { join } from 'path';

export const AuthenticateGrpcClientOptions: GrpcOptions = {
  options: {
    package: 'authenticate',
    protoPath: join(__dirname, 'authenticate.proto'),
  }
};
