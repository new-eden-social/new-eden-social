import { ApiUseTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, HttpStatus, Param, UseGuards, Post } from '@nestjs/common';
import { Character } from '@new-eden-social/api-character';
import { AuthenticatedCharacter } from '../authentication/authentication.decorators';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { FollowService } from '../follow.service';
import { AllianceClient } from '@new-eden-social/api-alliance';

@ApiUseTags('follow')
@Controller('follow')
export class FollowHttpController {

  constructor(
    private followService: FollowService,
    private allianceClient: AllianceClient,
  ){}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Follow a character',
  })
  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard)
  @Post('character/:characterId')
  public async followCharacter(
    @Param('characterId') characterId: number,
    @AuthenticatedCharacter() follower: Character,
  ): Promise<void> {
    const character = await this.characterService.get(characterId);
    const follow = await this.followService.checkIfFolowingCharacter(follower, character);

    if (follow) {
      await this.followService.unfollow(follow);
    }

    await this.followService.followCharacter(follower, character);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Follow a corporation',
  })
  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard)
  @Post('corporation/:corporationId')
  public async followCorporation(
    @Param('corporationId') corporationId: number,
    @AuthenticatedCharacter() follower: Character,
  ): Promise<void> {
    const corporation = await this.corporationService.get(corporationId);
    const follow = await this.followService.checkIfFolowingCorporation(follower, corporation);

    if (follow) {
      await this.followService.unfollow(follow);
    }

    await this.followService.followCorporation(follower, corporation);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Follow an Alliance',
  })
  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard)
  @Post('alliance/:allianceId')
  public async followAlliance(
    @Param('allianceId') allianceId: number,
    @AuthenticatedCharacter() follower: Character,
  ): Promise<void> {
    const alliance = await this.allianceClient.service.get(allianceId).toPromise();
    const follow = await this.followService.checkIfFolowingAlliance(follower, alliance);

    if (follow) {
      await this.followService.unfollow(follow);
    }

    await this.followService.followAlliance(follower, alliance);
  }
}
