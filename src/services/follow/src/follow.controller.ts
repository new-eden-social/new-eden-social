import { ApiUseTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, HttpStatus, Param, UseGuards, Post } from '@nestjs/common';
import { Character } from '@new-eden-soci@new-eden-social/api-character';
import { AuthenticatedCharacter } from '../authentication/authentication.decorators';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { DFollowAction } from './follow.dto';
import { FollowService } from './follow.service';
import { CharacterService } from '@new-eden-soci@new-eden-social/api-character';
import { CorporationService } from '@new-eden-social/api-corporation';
import { AllianceService } from '@new-eden-social/api-alliance';
import { FOLLOW_ACTION_TYPE } from './follow.constants';

@ApiUseTags('follow')
@Controller('follow')
export class FollowController {

  constructor(
    private readonly followService: FollowService,
    private readonly characterService: CharacterService,
    private readonly corporationService: CorporationService,
    private readonly allianceService: AllianceService,
  ) {
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: DFollowAction,
    description: 'Follow a character',
  })
  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard)
  @Post('character/:characterId')
  public async followCharacter(
    @Param('characterId') characterId: number,
    @AuthenticatedCharacter() follower: Character,
  ): Promise<DFollowAction> {
    const character = await this.characterService.get(characterId);
    const follow = await this.followService.checkIfFolowingCharacter(follower, character);

    if (follow) {
      await this.followService.unfollow(follow);
      return new DFollowAction(FOLLOW_ACTION_TYPE.UN_FOLLOW, follow);
    }

    const newFollow = await this.followService.followCharacter(follower, character);
    return new DFollowAction(FOLLOW_ACTION_TYPE.FOLLOW, newFollow);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: DFollowAction,
    description: 'Follow a corporation',
  })
  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard)
  @Post('corporation/:corporationId')
  public async followCorporation(
    @Param('corporationId') corporationId: number,
    @AuthenticatedCharacter() follower: Character,
  ): Promise<DFollowAction> {
    const corporation = await this.corporationService.get(corporationId);
    const follow = await this.followService.checkIfFolowingCorporation(follower, corporation);

    if (follow) {
      await this.followService.unfollow(follow);
      return new DFollowAction(FOLLOW_ACTION_TYPE.UN_FOLLOW, follow);
    }

    const newFollow = await this.followService.followCorporation(follower, corporation);
    return new DFollowAction(FOLLOW_ACTION_TYPE.FOLLOW, newFollow);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: DFollowAction,
    description: 'Follow an Alliance',
  })
  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard)
  @Post('alliance/:allianceId')
  public async followAlliance(
    @Param('allianceId') allianceId: number,
    @AuthenticatedCharacter() follower: Character,
  ): Promise<DFollowAction> {
    const alliance = await this.allianceService.get(allianceId);
    const follow = await this.followService.checkIfFolowingAlliance(follower, alliance);

    if (follow) {
      await this.followService.unfollow(follow);
      return new DFollowAction(FOLLOW_ACTION_TYPE.UN_FOLLOW, follow);
    }

    const newFollow = await this.followService.followAlliance(follower, alliance);
    return new DFollowAction(FOLLOW_ACTION_TYPE.FOLLOW, newFollow);
  }

}
