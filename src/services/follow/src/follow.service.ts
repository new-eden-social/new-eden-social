import { Injectable } from '@nestjs/common';
import { Follow } from './follow.entity';
import { CommandBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowRepository } from './follow.repository';

@Injectable()
export class FollowService {

  constructor(
        @InjectRepository(FollowRepository)
        private readonly followRepository: FollowRepository,
    ) {
  }

  async unfollow(follow: Follow): Promise<void> {
    await this.followRepository.delete(follow);
  }

  async followCharacter(
        followerId: number,
        followingId: number,
    ): Promise<Follow> {
    const follow = new Follow();
    follow.followerId = followerId;
    follow.followingCharacterId = followingId;

    return this.followRepository.save(follow);
  }

  async followCorporation(
        followerId: number,
        followingId: number,
    ): Promise<Follow> {
    const follow = new Follow();
    follow.followerId = followerId;
    follow.followingCorporationId = followingId;

    return this.followRepository.save(follow);
  }

  followAlliance(
        followerId: number,
        followingId: number,
    ): Promise<Follow> {
    const follow = new Follow();
    follow.followerId = followerId;
    follow.followingAllianceId = followingId;

    return this.followRepository.save(follow);
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
