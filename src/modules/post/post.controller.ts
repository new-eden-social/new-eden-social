import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Request,
  Response,
} from '@nestjs/common';
import { PostService } from './post.service';
import { ICreatePostRequest } from './post.interface';

@Controller('posts')
export class PostController {

  constructor(private postService: PostService) {
  }

  @Get('/character/:characterId')
  public async getForCharacter(
    @Response() res,
    @Param('characterId') characterId,
    @Query('limit') limit,
    @Query('page') page,
  ) {
    const posts = await this.postService.getCharacterPosts(characterId, limit, page);

    res.status(HttpStatus.OK).json(posts);
  }

  @Get('/:id')
  public async get(@Response() res, @Param('id') postId) {
    const post = await this.postService.get(postId);

    res.status(HttpStatus.OK).json(post);
  }

  @Post('')
  public async create(@Request() req, @Response() res, @Body('post') postData: ICreatePostRequest) {
    const post = await this.postService.create(postData, req.character);

    res.status(HttpStatus.CREATED).json(post);
  }

}
