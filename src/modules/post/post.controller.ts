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
import { ICreatePostRequest } from './post.validate';
import { CharacterService } from '../character/character.service';
import { CorporationService } from '../corporation/corporation.service';
import { CorporationRoles } from '../corporation/corporation.roles.decorator';
import { CORPORATION_ROLES } from '../corporation/corporation.constants';
import { AllianceService } from '../alliance/alliance.service';
import { CorporationAllianceExecutorGuard, } from '../corporation/corporation.allianceExecutor.guard';
import { DPost, DPostList } from './post.dto';

@Controller('posts')
export class PostController {

  constructor(
    private postService: PostService,
    private characterService: CharacterService,
    private corporationService: CorporationService,
    private allianceService: AllianceService,
  ) {
  }

  @Get('/character/:characterId')
  public async getCharacterWall(
    @Response() res,
    @Param('characterId') characterId,
    @Query('limit') limit = 10,
    @Query('page') page = 0,
  ) {
    const character = await this.characterService.get(characterId);
    const { posts, count } = await this.postService.getCharacterWall(character, limit, page);

    const response = new DPostList(posts, page, limit, count);

    res.status(HttpStatus.OK).json(response);
  }

  @Get('/corporation/:corporationId')
  public async getCorporationWall(
    @Response() res,
    @Param('corporationId') corporationId,
    @Query('limit') limit,
    @Query('page') page,
  ) {
    const corporation = await this.corporationService.get(corporationId);
    const { posts, count } = await this.postService.getCorporationWall(corporation, limit, page);

    const response = new DPostList(posts, page, limit, count);

    res.status(HttpStatus.OK).json(response);
  }

  @Get('/alliance/:allianceId')
  public async getAllianceWall(
    @Response() res,
    @Param('allianceId') allianceId,
    @Query('limit') limit,
    @Query('page') page,
  ) {
    const alliance = await this.allianceService.get(allianceId);
    const { posts, count } = await this.postService.getAllianceWall(alliance, limit, page);

    const response = new DPostList(posts, page, limit, count);

    res.status(HttpStatus.OK).json(response);
  }

  @Get('/hashtag/:hashtag')
  public async getByHashtag(
    @Response() res,
    @Param('hashtag') hashtag,
    @Query('limit') limit,
    @Query('page') page,
  ) {
    const { posts, count } = await this.postService.getByHashtag(hashtag, limit, page);

    const response = new DPostList(posts, page, limit, count);

    res.status(HttpStatus.OK).json(response);
  }

  @Get('/location/:locationId')
  public async getByLocation(
    @Response() res,
    @Param('locationId') locationId,
    @Query('limit') limit,
    @Query('page') page,
  ) {
    const { posts, count } = await this.postService.getByLocation(locationId, limit, page);

    const response = new DPostList(posts, page, limit, count);

    res.status(HttpStatus.OK).json(response);
  }

  @Get('/:id')
  public async get(@Response() res, @Param('id') postId) {
    const post = await this.postService.get(postId);

    const response = new DPost(post);

    res.status(HttpStatus.OK).json(response);
  }

  @Post('/character')
  public async createAsCharacter(
    @Request() req,
    @Response() res,
    @Body('post') postData: ICreatePostRequest,
  ) {
    const post = await this.postService.createAsCharacter(postData, req.character);

    const response = new DPost(post);

    res.status(HttpStatus.CREATED).json(response);
  }

  @Post('/corporation')
  @CorporationRoles(
    CORPORATION_ROLES.DIRECTOR,
    CORPORATION_ROLES.DIPLOMAT,
    CORPORATION_ROLES.COMMUNICATION_OFFICER)
  public async createAsCorporation(
    @Request() req,
    @Response() res,
    @Body('post') postData: ICreatePostRequest,
  ) {
    const post = await this.postService.createAsCorporation(postData, req.character.corporation);

    const response = new DPost(post);

    res.status(HttpStatus.CREATED).json(response);
  }

  @Post('/alliance')
  @UseGuards(CorporationAllianceExecutorGuard)
  @CorporationRoles(
    CORPORATION_ROLES.DIRECTOR,
    CORPORATION_ROLES.DIPLOMAT,
    CORPORATION_ROLES.COMMUNICATION_OFFICER)
  public async createAsAlliance(
    @Request() req,
    @Response() res,
    @Body('post') postData: ICreatePostRequest,
  ) {
    const post = await this.postService.createAsAlliance(
      postData,
      req.character.corporation.alliance);

    const response = new DPost(post);

    res.status(HttpStatus.CREATED).json(response);
  }

}
