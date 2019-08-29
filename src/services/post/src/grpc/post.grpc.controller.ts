import { Controller } from '@nestjs/common';
import { IPostGrpcService } from './post.grpc.interface';
import { PostService } from '../post.service';

@Controller()
export class PostGrpcController implements IPostGrpcService {

  constructor(
    private readonly postService: PostService,
    ) {
  }

}
