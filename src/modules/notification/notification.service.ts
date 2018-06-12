import { Injectable } from '@nestjs/common';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { NOTIFICATION_TYPE } from './notification.constants';
import { Character } from '../character/character.entity';
import { NotificationRepository } from './notification.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { DWsNotificationEvent } from './notification.dto';
import { HttpNotificationAlreadySeenException } from './notificationAlreadySeen.exception';

@Injectable()
export class NotificationService {

  constructor(
    @InjectRepository(NotificationRepository)
    private notificationRepository: NotificationRepository,
    private notificationGateway: WebsocketGateway,
  ) {
  }

  public async createNotificationForNewPost(
    recipient: Character,
    type: NOTIFICATION_TYPE,
  ): Promise<void> {
    const notification = new Notification();
    notification.type = type;
    notification.recipient = recipient;

    await this.notificationRepository.save(notification);

    this.notificationGateway.sendEventToCharacter(
      recipient,
      new DWsNotificationEvent(notification));
  }

  public async getLatest(
    character: Character,
    limit: number = 20,
    page: number = 0,
  ): Promise<{ notifications: Notification[], count: number }> {
    const [notifications, count] = await this.notificationRepository.getLatestForCharacter(
      character,
      limit,
      page);

    return { notifications, count };
  }

  public async markAsSeen(
    notification: Notification,
  ): Promise<void> {
    console.log(notification);
    if (notification.seenAt) {
      throw new HttpNotificationAlreadySeenException();
    }
    await this.notificationRepository.markAsSeen(notification);
  }

  public async get(
    notificationId: string,
    character: Character,
  ): Promise<Notification> {
    return this.notificationRepository.findOneForCharacter(notificationId, character);
  }

}
