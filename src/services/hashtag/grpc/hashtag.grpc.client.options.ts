import { GrpcOptions } from '@nestjs/microservices';
import { join } from 'path';

export const HashtagGrpcClientOptions: GrpcOptions = {
  options: {
    package: 'hashtag',
    protoPath: join(__dirname, 'hashtag.proto'),
  }
};
