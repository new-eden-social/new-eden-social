import { GrpcOptions } from '@nestjs/microservices';
import { join } from 'path';

export const AllianceGrpcClientOptions: GrpcOptions = {
  options: {
    package: 'alliance',
    protoPath: join(__dirname, 'alliance.proto'),
  }
};
