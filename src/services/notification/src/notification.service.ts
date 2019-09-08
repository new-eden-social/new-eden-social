import { Injectable } from '@nestjs/common';
import { NotificationRepository } from './notification.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { NOTIFICATION_TYPE, WS_NOTIFICATION_EVENT, WS_NOTIFICATION_SEEN_EVENT } from './notification.constants';
import { WebsocketRedisClient } from '@new-eden-social/api-websocket';

@Injectable()
export class NotificationService {

  constructor(
    @InjectRepository(NotificationRepository)
    private readonly notificationRepository: NotificationRepository,
    private readonly websocketRedisClient: WebsocketRedisClient,
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
    notification.eventUuid = eventUuid;
    notification.type = type;
    notification.recipientId = recipientId;
    notification.senderCharacterId = senderCharacterId;
    notification.senderCorporationId = senderCorporationId;
    notification.senderAllianceId = senderAllianceId;
    notification.postId = postId;
    notification.commentId = commentId;
    await this.notificationRepository.save(notification);

    await this.websocketRedisClient.emitCharacterEvent<Notification>(
      notification.recipientId,
      WS_NOTIFICATION_EVENT,
      notification,
    ).toPromise();

    return notification;
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
  ): Promise<Notification> {
    if (notification.seenAt) {
      throw new Error('notification already marked as seen');
    }

    const markedAsSeen = await this.notificationRepository.markAsSeen(notification);

    await this.websocketRedisClient.emitCharacterEvent<Notification>(
      notification.recipientId,
      WS_NOTIFICATION_SEEN_EVENT,
      notification,
    );

    return markedAsSeen;
  }

  public async get(
    notificationId: string,
    characterId: number,
  ): Promise<Notification> {
    return this.notificationRepository.findOneForCharacter(notificationId, characterId);
  }

}
