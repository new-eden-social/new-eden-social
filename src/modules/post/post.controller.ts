import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { VCreatePost } from './post.validate';
import { CharacterService } from '../character/character.service';
import { CorporationService } from '../corporation/corporation.service';
import { CorporationRoles } from '../corporation/corporation.roles.decorator';
import { CORPORATION_ROLES } from '../corporation/corporation.constants';
import { AllianceService } from '../alliance/alliance.service';
import { CorporationAllianceExecutorGuard } from '../corporation/corporation.allianceExecutor.guard';
import { DPost, DPostList } from './post.dto';
import { CorporationRolesGuard } from '../corporation/corporation.roles.guard';
import { AuthenticatedCharacter } from '../authentication/authentication.decorators';
import { Character } from '../character/character.entity';
import { Pagination } from '../core/pagination/pagination.decorator';
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { VPagination } from '../core/pagination/pagination.validation';
import { AuthenticationGuard } from '../authentication/authentication.guard';

@ApiUseTags('posts')
@Controller('posts')
export class PostController {

  constructor(
    private postService: PostService,
    private characterService: CharacterService,
    private corporationService: CorporationService,
    private allianceService: AllianceService,
  ) {
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: DPostList,
    description: 'Get latest posts',
  })
  @Get('latest')
  public async getLatestPosts(
    @Pagination() pagination: VPagination,
  ) {
    const { posts, count } = await this.postService.getLatest(pagination.limit, pagination.page);

    return new DPostList(posts, pagination.page, pagination.limit, count);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: DPostList,
    description: 'Get Character Wall',
  })
  @Get('/character/:characterId')
  public async getCharacterWall(
    @Param('characterId') characterId: number,
    @Pagination() pagination: VPagination,
  ): Promise<DPostList> {
    const character = await this.characterService.get(characterId);
    const { posts, count } = await this.postService.getCharacterWall(
      character,
      pagination.limit,
      pagination.page);

    return new DPostList(posts, pagination.page, pagination.limit, count);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: DPostList,
    description: 'Get Corporation Wall',
  })
  @Get('/corporation/:corporationId')
  public async getCorporationWall(
    @Param('corporationId') corporationId: number,
    @Pagination() pagination: VPagination,
  ): Promise<DPostList> {
    const corporation = await this.corporationService.get(corporationId);
    const { posts, count } = await this.postService.getCorporationWall(
      corporation,
      pagination.limit,
      pagination.page);

    return new DPostList(posts, pagination.page, pagination.limit, count);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: DPostList,
    description: 'Get Alliance Wall',
  })
  @Get('/alliance/:allianceId')
  public async getAllianceWall(
    @Param('allianceId') allianceId: number,
    @Pagination() pagination: VPagination,
  ): Promise<DPostList> {
    const alliance = await this.allianceService.get(allianceId);
    const { posts, count } = await this.postService.getAllianceWall(
      alliance,
      pagination.limit,
      pagination.page);

    return new DPostList(posts, pagination.page, pagination.limit, count);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: DPostList,
    description: 'Get posts for Hashtag',
  })
  @Get('/hashtag/:hashtag')
  public async getByHashtag(
    @Param('hashtag') hashtag: string,
    @Pagination() pagination: VPagination,
  ): Promise<DPostList> {
    const { posts, count } = await this.postService.getByHashtag(
      hashtag,
      pagination.limit,
      pagination.page);

    return new DPostList(posts, pagination.page, pagination.limit, count);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: DPostList,
    description: 'Get posts for Location',
  })
  @Get('/location/:locationId')
  public async getByLocation(
    @Param('locationId') locationId: number,
    @Pagination() pagination: VPagination,
  ): Promise<DPostList> {
    const { posts, count } = await this.postService.getByLocation(
      locationId,
      pagination.limit,
      pagination.page);

    return new DPostList(posts, pagination.page, pagination.limit, count);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: DPost,
    description: 'Get specific post by id',
  })
  @Get('/:id')
  public async get(
    @Param('id') postId: string,
  ): Promise<DPost> {
    const post = await this.postService.get(postId);
    return new DPost(post);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DPost,
    description: 'Post as Character',
  })
  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard)
  @Post('/character')
  public async createAsCharacter(
    @Body() postData: VCreatePost,
    @AuthenticatedCharacter() character: Character,
  ): Promise<any> {
    const post = await this.postService.createAsCharacter(postData, character);
    return new DPost(post);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DPost,
    description: 'Post as Corporation',
  })
  @ApiBearerAuth()
  @Post('/corporation')
  @UseGuards(CorporationRolesGuard)
  @CorporationRoles(
    CORPORATION_ROLES.DIRECTOR,
    CORPORATION_ROLES.DIPLOMAT,
    CORPORATION_ROLES.COMMUNICATION_OFFICER)
  public async createAsCorporation(
    @Body() postData: VCreatePost,
    @AuthenticatedCharacter() character: Character,
  ): Promise<DPost> {
    const post = await this.postService.createAsCorporation(postData, character.corporation);
    return new DPost(post);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DPost,
    description: 'Post as Alliance',
  })
  @ApiBearerAuth()
  @Post('/alliance')
  @UseGuards(CorporationRolesGuard, CorporationAllianceExecutorGuard)
  @CorporationRoles(
    CORPORATION_ROLES.DIRECTOR,
    CORPORATION_ROLES.DIPLOMAT,
    CORPORATION_ROLES.COMMUNICATION_OFFICER)
  public async createAsAlliance(
    @Body() postData: VCreatePost,
    @AuthenticatedCharacter() character: Character,
  ): Promise<DPost> {
    const post = await this.postService.createAsAlliance(
      postData,
      character.corporation.alliance);

    return new DPost(post);
  }

}
