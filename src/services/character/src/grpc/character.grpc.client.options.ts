import { GrpcOptions } from '@nestjs/common/interfaces/microservices/microservice-configuration.interface';
import { join } from 'path';

export const CharacterGrpcClientOptions: GrpcOptions = {
  options: {
    package: 'character',
    protoPath: join(__dirname, 'character.proto'),
  }
};
