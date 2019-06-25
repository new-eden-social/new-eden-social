import { Controller, Get, HttpStatus, Param, Response } from '@nestjs/common';
import { CorporationService } from './corporation.service';
import { DCorporation } from './corporation.dto';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { FollowService } from '../follow/follow.service';
import { PostService } from '../post/post.service';

@ApiUseTags('corporations')
@Controller('corporations')
export class CorporationController {

  constructor(
    private readonly corporationService: CorporationService,
    private readonly followService: FollowService,
    private readonly postService: PostService,
  ) {
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: DCorporation,
    description: 'Get Corporation by id',
  })
  @Get('/:corporationId')
  public async search(
    @Param('corporationId') corporationId: number,
  ): Promise<DCorporation> {
    const corporation = await this.corporationService.get(corporationId);
    const followers = await this.followService.getCorporationFollowers(corporation);
    const numPosts = await this.postService.getNumOfPostsByCorporation(corporation);

    return new DCorporation(corporation, followers, numPosts);
  }

}
