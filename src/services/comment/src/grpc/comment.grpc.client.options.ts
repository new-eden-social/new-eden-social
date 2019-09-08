import { join } from 'path';
import { GrpcOptions } from '@nestjs/microservices';

export const CommentGrpcClientOptions: GrpcOptions = {
  options: {
    package: 'comment',
    protoPath: join(__dirname, 'comment.proto'),
  }
};
