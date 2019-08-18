import { Injectable } from '@nestjs/common';
import { Follow } from './follow.entity';
import { CommandBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowRepository } from './follow.repository';
import { FollowCommand } from './commands/follow.command';
import { UnFollowCommand } from './commands/unfollow.command';

@Injectable()
export class FollowService {

  constructor(
        private readonly commandBus: CommandBus,
        @InjectRepository(FollowRepository)
        private readonly followRepository: FollowRepository,
    ) {
  }

  async unfollow(follow: Follow): Promise<void> {
    return this.commandBus.execute(
            new UnFollowCommand(follow),
        );
  }

  followCharacter(
        followerId: number,
        followingId: number,
    ): Promise<Follow> {
    const follow = new Follow();
    follow.followerId = followerId;
    follow.followingCharacterId = followingId;

    return this.commandBus.execute(
            new FollowCommand(follow),
        );
  }

  followCorporation(
        followerId: number,
        followingId: number,
    ): Promise<Follow> {
    const follow = new Follow();
    follow.followerId = followerId;
    follow.followingCorporationId = followingId;

    return this.commandBus.execute(
            new FollowCommand(follow),
        );
  }

  followAlliance(
        followerId: number,
        followingId: number,
    ): Promise<Follow> {
    const follow = new Follow();
    follow.followerId = followerId;
    follow.followingAllianceId = followingId;

    return this.commandBus.execute(
            new FollowCommand(follow),
        );
  }

  checkIfFolowingCharacter(
        followerId: number,
        followingId: number,
    ): Promise<Follow> {
    return this.followRepository.getFollowingCharacter(followerId, followingId);
  }

  checkIfFolowingCorporation(
        followerId: number,
        followingId: number,
    ): Promise<Follow> {
    return this.followRepository.getFollowingCorporation(followerId, followingId);
  }

  checkIfFolowingAlliance(
        followerId: number,
        followingId: number,
    ): Promise<Follow> {
    return this.followRepository.getFollowingAlliance(followerId, followingId);
  }

  getCharacterFollowers(character: number): Promise<Follow[]> {
    return this.followRepository.getCharacterFollowers(character);
  }

  getCorporationFollowers(corporation: number): Promise<Follow[]> {
    return this.followRepository.getCorporationFollowers(corporation);
  }

  getAllianceFollowers(alliance: number): Promise<Follow[]> {
    return this.followRepository.getAllianceFollowers(alliance);
  }

  getCharacterFollowing(character: number): Promise<Follow[]> {
    return this.followRepository.getCharacterFollowing(character);
  }

}
