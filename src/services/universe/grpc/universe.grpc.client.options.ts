import { GrpcOptions } from '@nestjs/microservices';
import { join } from 'path';

export const UniverseGrpcClientOptions: GrpcOptions = {
  options: {
    package: 'universe',
    protoPath: join(__dirname, 'universe.proto'),
  }
};
