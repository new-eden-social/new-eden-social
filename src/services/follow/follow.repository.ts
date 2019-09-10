import { EntityRepository, Repository } from 'typeorm';
import { Follow } from './follow.entity';

@EntityRepository(Follow)
export class FollowRepository extends Repository<Follow> {

  getFollowingCharacter(
        followerId: number,
        followingCharacterId: number,
    ): Promise<Follow> {
    return this.findOne({
      where: {
        followerId,
        followingCharacterId,
      },
    });
  }

  getFollowingCorporation(
        followerId: number,
        followingCorporationId: number,
    ): Promise<Follow> {
    return this.findOne({
      where: {
        followerId,
        followingCorporationId,
      },
    });
  }

  getFollowingAlliance(
        followerId: number,
        followingAllianceId: number,
    ): Promise<Follow> {
    return this.findOne({
      where: {
        followerId,
        followingAllianceId,
      },
    });
  }

  getCharacterFollowers(
        characterId: number,
    ): Promise<Follow[]> {
    return this.find({
      where: {
        followingCharacterId: characterId,
      },
    });
  }

  getCorporationFollowers(
        corporationId: number,
    ): Promise<Follow[]> {
    return this.find({
      where: {
        followingCorporationId: corporationId,
      },
    });
  }

  getAllianceFollowers(
        allianceId: number,
    ): Promise<Follow[]> {
    return this.find({
      where: {
        followingAllianceId: allianceId,
      },
    });
  }

  getCharacterFollowing(
        characterId: number,
    ): Promise<Follow[]> {
    return this.find({
      where: {
        followerId: characterId,
      },
    });
  }

}
