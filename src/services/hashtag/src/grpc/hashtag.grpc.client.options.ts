import { GrpcOptions } from '@nestjs/common/interfaces/microservices/microservice-configuration.interface';
import { join } from 'path';

export const HashtagGrpcClientOptions: GrpcOptions = {
  options: {
    package: 'hashtag',
    protoPath: join(__dirname, 'hashtag.proto'),
  }
};
