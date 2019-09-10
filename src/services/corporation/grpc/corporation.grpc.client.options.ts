import { GrpcOptions } from '@nestjs/common/interfaces/microservices/microservice-configuration.interface';
import { join } from 'path';

export const CorporationGrpcClientOptions: GrpcOptions = {
  options: {
    package: 'corporation',
    protoPath: join(__dirname, 'corporation.proto'),
  }
};
