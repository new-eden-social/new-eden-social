import { GrpcOptions } from '@nestjs/common/interfaces/microservices/microservice-configuration.interface';
import { join } from 'path';

export const PostGrpcClientOptions: GrpcOptions = {
  options: {
    package: 'post',
    protoPath: join(__dirname, 'post.proto'),
  }
};
