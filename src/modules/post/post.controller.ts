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
import { CorporationAllianceExecutorGuard } from '../corporation/corporation.allianceExecutor.guard';
import { DPost, DPostList } from './post.dto';
import { VPagination } from '../../validate/pagination.validate';

@Controller('posts')
export class PostController {

  constructor(
    private postService: PostService,
    private characterService: CharacterService,
    private corporationService: CorporationService,
    private allianceService: AllianceService,
  ) {
  }

  @Get('latest')
  public async getLatestPosts(
    @Request() req,
    @Response() res,
    @Query() query: VPagination,
  ) {
    const { posts, count } = await this.postService.getLatest(query.limit, query.page);

    const response = new DPostList(posts, query.page, query.limit, count);

    res.status(HttpStatus.OK).json(response);
  }

  @Get('/character/:characterId')
  public async getCharacterWall(
    @Response() res,
    @Param('characterId') characterId,
    @Query() query: VPagination,
  ) {
    const character = await this.characterService.get(characterId);
    const { posts, count } = await this.postService.getCharacterWall(
      character,
      query.limit,
      query.page);

    const response = new DPostList(posts, query.page, query.limit, count);

    res.status(HttpStatus.OK).json(response);
  }

  @Get('/corporation/:corporationId')
  public async getCorporationWall(
    @Response() res,
    @Param('corporationId') corporationId,
    @Query() query: VPagination,
  ) {
    const corporation = await this.corporationService.get(corporationId);
    const { posts, count } = await this.postService.getCorporationWall(
      corporation,
      query.limit,
      query.page);

    const response = new DPostList(posts, query.page, query.limit, count);

    res.status(HttpStatus.OK).json(response);
  }

  @Get('/alliance/:allianceId')
  public async getAllianceWall(
    @Response() res,
    @Param('allianceId') allianceId,
    @Query() query: VPagination,
  ) {
    const alliance = await this.allianceService.get(allianceId);
    const { posts, count } = await this.postService.getAllianceWall(
      alliance,
      query.limit,
      query.page);

    const response = new DPostList(posts, query.page, query.limit, count);

    res.status(HttpStatus.OK).json(response);
  }

  @Get('/hashtag/:hashtag')
  public async getByHashtag(
    @Response() res,
    @Param('hashtag') hashtag,
    @Query() query: VPagination,
  ) {
    const { posts, count } = await this.postService.getByHashtag(hashtag, query.limit, query.page);

    const response = new DPostList(posts, query.page, query.limit, count);

    res.status(HttpStatus.OK).json(response);
  }

  @Get('/location/:locationId')
  public async getByLocation(
    @Response() res,
    @Param('locationId') locationId,
    @Query() query: VPagination,
  ) {
    const { posts, count } = await this.postService.getByLocation(
      locationId,
      query.limit,
      query.page);

    const response = new DPostList(posts, query.page, query.limit, count);

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
