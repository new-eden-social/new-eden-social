import { Injectable } from '@nestjs/common';
import { Character } from '../character/character.entity';
import { Follow } from './follow.entity';
import { CommandBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowRepository } from './follow.repository';
import { FollowCommand } from './commands/follow.command';
import { Corporation } from '../corporation/corporation.entity';
import { Alliance } from '../alliance/alliance.entity';
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
        follower: Character,
        following: Character,
    ): Promise<Follow> {
    const follow = new Follow();
    follow.follower = follower;
    follow.followingCharacter = following;

    return this.commandBus.execute(
            new FollowCommand(follow),
        );
  }

  followCorporation(
        follower: Character,
        following: Corporation,
    ): Promise<Follow> {
    const follow = new Follow();
    follow.follower = follower;
    follow.followingCorporation = following;

    return this.commandBus.execute(
            new FollowCommand(follow),
        );
  }

  followAlliance(
        follower: Character,
        following: Alliance,
    ): Promise<Follow> {
    const follow = new Follow();
    follow.follower = follower;
    follow.followingAlliance = following;

    return this.commandBus.execute(
            new FollowCommand(follow),
        );
  }

  checkIfFolowingCharacter(
        follower: Character,
        following: Character,
    ): Promise<Follow> {
    return this.followRepository.getFollowingCharacter(follower, following);
  }

  checkIfFolowingCorporation(
        follower: Character,
        following: Corporation,
    ): Promise<Follow> {
    return this.followRepository.getFollowingCorporation(follower, following);
  }

  checkIfFolowingAlliance(
        follower: Character,
        following: Alliance,
    ): Promise<Follow> {
    return this.followRepository.getFollowingAlliance(follower, following);
  }

  getCharacterFollowers(character: Character): Promise<Follow[]> {
    return this.followRepository.getCharacterFollowers(character);
  }

  getCorporationFollowers(corporation: Corporation): Promise<Follow[]> {
    return this.followRepository.getCorporationFollowers(corporation);
  }

  getAllianceFollowers(alliance: Alliance): Promise<Follow[]> {
    return this.followRepository.getAllianceFollowers(alliance);
  }

  getCharacterFollowing(character: Character): Promise<Follow[]> {
    return this.followRepository.getCharacterFollowing(character);
  }

}
