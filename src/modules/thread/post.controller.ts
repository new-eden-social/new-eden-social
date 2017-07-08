import { Response, Param, Controller, Get, Post, Body, HttpStatus } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {

  constructor(private postService: PostService) {
  }

  @Get('/:id')
  public async search(@Response() res, @Param('id') postId) {
    const post = await this.postService.get(postId);

    res.status(HttpStatus.OK).json(post);
  }

}
