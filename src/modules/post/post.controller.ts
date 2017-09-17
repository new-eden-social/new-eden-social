import { Body, Controller, Get, HttpStatus, Param, Post, Request, Response } from '@nestjs/common';
import { PostService } from './post.service';
import { ICreatePostRequest } from './post.interface';

@Controller('posts')
export class PostController {

  constructor(private postService: PostService) {
  }

  @Get('/:id')
  public async get(@Response() res, @Param('id') postId) {
    const post = await this.postService.get(postId);

    res.status(HttpStatus.OK).json(post.response);
  }

  @Post('')
  public async create(@Request() req, @Response() res, @Body('post') postData: ICreatePostRequest) {
    const post = await this.postService.create(postData, req.character);

    res.status(HttpStatus.CREATED).json(post.response);
  }

}
