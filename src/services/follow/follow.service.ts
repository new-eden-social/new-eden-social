import { Injectable } from '@nestjs/common';
import { Follow } from './follow.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowRepository } from './follow.repository';
import { NotificationGrpcClient, NOTIFICATION_TYPE } from '@new-eden-social/services-notification';
import * as uuidv4 from 'uuid/v4';

@Injectable()
export class FollowService {

  constructor(
    @InjectRepository(FollowRepository)
    private readonly followRepository: FollowRepository,
    private readonly notificationClient: NotificationGrpcClient,
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

    const createdFollow = await this.followRepository.save(follow);

    const eventUuid = uuidv4();
    this.notificationClient.service.create({
      eventUuid,
      type: NOTIFICATION_TYPE.NEW_FOLLOWER,
      recipientId: followingId,
      senderCharacterId: followerId
    });

    return createdFollow;
  }

  async followCorporation(
        followerId: number,
        followingId: number,
    ): Promise<Follow> {
    const follow = new Follow();
    follow.followerId = followerId;
    follow.followingCorporationId = followingId;

    // TODO: Notification

    return this.followRepository.save(follow);
  }

  followAlliance(
        followerId: number,
        followingId: number,
    ): Promise<Follow> {
    const follow = new Follow();
    follow.followerId = followerId;
    follow.followingAllianceId = followingId;

    // TODO: Notification

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
