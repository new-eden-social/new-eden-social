import { GrpcOptions } from '@nestjs/common/interfaces/microservices/microservice-configuration.interface';
import { join } from 'path';

export const AllianceGRPCClientOptions: GrpcOptions = {
  options: {
    package: 'alliance',
    protoPath: join(__dirname, 'alliance.proto'),
  }
};
