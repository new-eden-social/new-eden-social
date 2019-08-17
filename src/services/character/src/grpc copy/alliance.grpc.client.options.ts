import { GrpcOptions } from '@nestjs/common/interfaces/microservices/microservice-configuration.interface';
import { join } from 'path';

export const AllianceGrpcClientOptions: GrpcOptions = {
  options: {
    package: 'alliance',
    protoPath: join(__dirname, 'alliance.proto'),
  }
};
