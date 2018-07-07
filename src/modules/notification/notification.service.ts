import { Injectable } from '@nestjs/common';
import { Character } from '../character/character.entity';
import { NotificationRepository } from './notification.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { HttpNotificationAlreadySeenException } from './notificationAlreadySeen.exception';
import { CreatePostCommand } from '../post/commands/create.command';
import { CommandBus } from '@nestjs/cqrs';
import { SeenNotificationCommand } from './commands/seen.command';

@Injectable()
export class NotificationService {

  constructor(
    @InjectRepository(NotificationRepository)
    private notificationRepository: NotificationRepository,
    private commandBus: CommandBus,
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
