import { GrpcOptions } from '@nestjs/common/interfaces/microservices/microservice-configuration.interface';
import { join } from 'path';

export const KillmailGrpcClientOptions: GrpcOptions = {
  options: {
    package: 'killmail',
    protoPath: join(__dirname, 'killmail.proto'),
  }
};
