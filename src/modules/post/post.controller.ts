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
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { ICreatePostRequest } from './post.interface';
import { CharacterService } from '../character/character.service';
import { CorporationService } from '../corporation/corporation.service';
import { CorporationRoles } from '../corporation/corporation.roles.decorator';
import { CorporationRolesGuard } from '../corporation/corporation.roles.guard';

@Controller('posts')
@UseGuards(CorporationRolesGuard)
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

  @Post('/character')
  public async createAsCharacter(
    @Request() req,
    @Response() res,
    @Body('post') postData: ICreatePostRequest,
  ) {
    const post = await this.postService.createAsCharacter(postData, req.character);

    res.status(HttpStatus.CREATED).json(post);
  }

  @Post('/corporation')
  // TODO: Add roles to constants
  @CorporationRoles('Director', 'Diplomat', 'Communications Officer')
  public async createAsCorporation(
    @Request() req,
    @Response() res,
    @Body('post') postData: ICreatePostRequest,
  ) {
    const post = await this.postService.createAsCorporation(postData, req.character.corporation);

    res.status(HttpStatus.CREATED).json(post);
  }

}
