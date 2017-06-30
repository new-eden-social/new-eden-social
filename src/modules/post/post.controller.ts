import { Response, Request, Param, Controller, Get, Post, Body, HttpStatus } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from './post.entety';
import { ICreatePostRequest } from './post.interface';

@Controller('posts')
export class PostController {

  constructor(private postService: PostService) {
  }

  @Get('')
  public async getAll(@Response() res) {
    const posts = await this.postService.all();

    res.status(200).json(posts.map(post => post.response))
  }

  @Get('/:id')
  public async search(@Response() res, @Param('id') postId) {
    const post = await this.postService.get(postId);

    res.status(HttpStatus.OK).json(post.response);
  }

  @Post('')
  public async create(@Request() req, @Response() res, @Body('post') postData: ICreatePostRequest) {
    const post = await this.postService.create(postData, req.character);

    res.status(HttpStatus.CREATED).json(post.response);
  }

}
