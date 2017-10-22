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
import { CharacterService } from '../character/character.service';
import { CorporationService } from '../corporation/corporation.service';

@Controller('posts')
export class PostController {

  constructor(
    private postService: PostService,
    private characterService: CharacterService,
    private corporationService: CorporationService,
  ) {
  }

  @Get('/character/:characterId')
  public async getCharacterWall(
    @Response() res,
    @Param('characterId') characterId,
    @Query('limit') limit,
    @Query('page') page,
  ) {
    const character = await this.characterService.get(characterId);
    const posts = await this.postService.getCharacterWall(character, limit, page);

    res.status(HttpStatus.OK).json(posts);
  }

  @Get('/corporation/:corporationId')
  public async getCorporationWall(
    @Response() res,
    @Param('corporationId') corporationId,
    @Query('limit') limit,
    @Query('page') page,
  ) {
    const corporation = await this.corporationService.get(corporationId);
    const posts = await this.postService.getCorporationWall(corporation, limit, page);

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
