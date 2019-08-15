import { EntityRepository, Repository } from 'typeorm';
import { Follow } from './follow.entity';
import { Character } from '@new-eden-social/api-character';
import { Corporation } from '@new-eden-social/api-corporation';
import { IAllianceEntity } from '@new-eden-social/api-alliance';

@EntityRepository(Follow)
export class FollowRepository extends Repository<Follow> {

  getFollowingCharacter(
        follower: Character,
        followingCharacter: Character,
    ): Promise<Follow> {
    return this.findOne({
      where: {
        follower,
        followingCharacter,
      },
    });
  }

  getFollowingCorporation(
        follower: Character,
        followingCorporation: Corporation,
    ): Promise<Follow> {
    return this.findOne({
      where: {
        follower,
        followingCorporation,
      },
    });
  }

  getFollowingAlliance(
        follower: Character,
        followingAlliance: IAllianceEntity,
    ): Promise<Follow> {
    return this.findOne({
      where: {
        follower,
        followingAlliance,
      },
    });
  }

  getCharacterFollowers(
        character: Character,
    ): Promise<Follow[]> {
    return this.find({
      where: {
        followingCharacter: character,
      },
    });
  }

  getCorporationFollowers(
        corporation: Corporation,
    ): Promise<Follow[]> {
    return this.find({
      where: {
        followingCorporation: corporation,
      },
    });
  }

  getAllianceFollowers(
        alliance: IAllianceEntity,
    ): Promise<Follow[]> {
    return this.find({
      where: {
        followingAlliance: alliance,
      },
    });
  }

  getCharacterFollowing(
        character: Character,
    ): Promise<Follow[]> {
    return this.find({
      where: {
        follower: character,
      },
    });
  }

}
