import { GrpcOptions } from '@nestjs/common/interfaces/microservices/microservice-configuration.interface';
import { join } from 'path';

export const UniverseGrpcClientOptions: GrpcOptions = {
  options: {
    package: 'universe',
    protoPath: join(__dirname, 'universe.proto'),
  }
};
