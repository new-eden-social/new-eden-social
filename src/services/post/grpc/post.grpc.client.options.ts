import { GrpcOptions } from '@nestjs/microservices';
import { join } from 'path';

export const PostGrpcClientOptions: GrpcOptions = {
  options: {
    package: 'post',
    protoPath: join(__dirname, 'post.proto'),
  }
};
