import { GrpcOptions } from '@nestjs/common/interfaces/microservices/microservice-configuration.interface';
import { join } from 'path';

export const MetascraperGrpcClientOptions: GrpcOptions = {
  options: {
    package: 'metascraper',
    protoPath: join(__dirname, 'metascraper.proto'),
  }
};
