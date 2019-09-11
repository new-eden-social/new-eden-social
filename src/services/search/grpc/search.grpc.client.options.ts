import { GrpcOptions } from '@nestjs/microservices';
import { join } from 'path';

export const SearchGrpcClientOptions: GrpcOptions = {
  options: {
    package: 'search',
    protoPath: join(__dirname, 'search.proto'),
  }
};
