import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { AllianceService } from './alliance.service';
import { DAlliance } from './alliance.dto';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { FollowService } from '../follow/follow.service';
import { PostService } from '../post/post.service';

@ApiUseTags('alliances')
@Controller('alliances')
export class AllianceController {

  constructor(
    private allianceService: AllianceService,
    private followService: FollowService,
    private postService: PostService,
  ) {
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: DAlliance,
    description: 'Get Alliance by id',
  })
  @Get('/:allianceId')
  public async search(
    @Param('allianceId') allianceId: number,
  ): Promise<DAlliance> {
    const alliance = await this.allianceService.get(allianceId);
    const followers = await this.followService.getAllianceFollowers(alliance);
    const numPosts = await this.postService.getNumOfPostsByAlliance(alliance);

    return new DAlliance(alliance, followers, numPosts);
  }

}
