import { Injectable } from '@nestjs/common';
import { NotificationRepository } from './notification.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { NOTIFICATION_TYPE } from './notification.constants';

@Injectable()
export class NotificationService {

  constructor(
    @InjectRepository(NotificationRepository)
    private readonly notificationRepository: NotificationRepository,
  ) {
  }

  public async create(
    eventUuid: string,
    type: NOTIFICATION_TYPE,
    recipientId: number,
    senderCharacterId?: number,
    senderCorporationId?: number,
    senderAllianceId?: number,
    postId?: string,
    commentId?: string,
  ): Promise<Notification> {
    // TODO: should we split this to different functions for each optional
    // variable?
    const notification = new Notification();
    return this.notificationRepository.save(notification);
  }

  public async getLatest(
    characterId: number,
    limit: number = 20,
    page: number = 0,
  ): Promise<{ notifications: Notification[], count: number }> {
    const [notifications, count] = await this.notificationRepository.getLatestForCharacter(
      characterId,
      limit,
      page);

    return { notifications, count };
  }

  public async markAsSeen(
    notification: Notification,
  ): Promise<void> {
    if (notification.seenAt) {
      throw new Error('notification already marked as seen');
    }

    this.notificationRepository.markAsSeen(notification);
  }

  public async get(
    notificationId: string,
    characterId: number,
  ): Promise<Notification> {
    return this.notificationRepository.findOneForCharacter(notificationId, characterId);
  }

}
