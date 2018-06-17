import { Injectable } from '@nestjs/common';
import { Character } from '../character/character.entity';
import { NotificationRepository } from './notification.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { HttpNotificationAlreadySeenException } from './notificationAlreadySeen.exception';

@Injectable()
export class NotificationService {

  constructor(
    @InjectRepository(NotificationRepository)
    private notificationRepository: NotificationRepository,
  ) {
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
