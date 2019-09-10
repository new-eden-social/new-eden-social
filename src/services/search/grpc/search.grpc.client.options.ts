import { GrpcOptions } from '@nestjs/common/interfaces/microservices/microservice-configuration.interface';
import { join } from 'path';

export const SearchGrpcClientOptions: GrpcOptions = {
  options: {
    package: 'search',
    protoPath: join(__dirname, 'search.proto'),
  }
};
