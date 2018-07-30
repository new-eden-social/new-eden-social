import { Controller, Get, HttpStatus, Param, Response } from '@nestjs/common';
import { CorporationService } from './corporation.service';
import { DCorporation } from './corporation.dto';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { FollowService } from '../follow/follow.service';

@ApiUseTags('corporations')
@Controller('corporations')
export class CorporationController {

  constructor(
    private corporationService: CorporationService,
    private followService: FollowService,
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

    return new DCorporation(corporation, followers);
  }

}
