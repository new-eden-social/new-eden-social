import { Injectable } from '@nestjs/common';
import { Character } from '@new-eden-soci@new-eden-social/api-character';
import { NotificationRepository } from './notification.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { HttpNotificationAlreadySeenException } from './notificationAlreadySeen.exception';
import { CommandBus } from '@nestjs/cqrs';
import { SeenNotificationCommand } from './commands/seen.command';

@Injectable()
export class NotificationService {

  constructor(
    @InjectRepository(NotificationRepository)
    private readonly notificationRepository: NotificationRepository,
    private readonly commandBus: CommandBus,
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

    await this.commandBus.execute(
      new SeenNotificationCommand(notification),
    );
  }

  public async get(
    notificationId: string,
    character: Character,
  ): Promise<Notification> {
    return this.notificationRepository.findOneForCharacter(notificationId, character);
  }

}
