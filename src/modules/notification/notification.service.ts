import { Injectable } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
import { NOTIFICATION_TYPE } from './notification.constants';
import { Character } from '../character/character.entity';
import { NotificationRepository } from './notification.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationService {

  constructor(
    @InjectRepository(NotificationRepository)
    private notificationRepository: NotificationRepository,
    private notificationGateway: NotificationGateway,
  ) {
  }

  public async createNotificationForNewPost(recipient: Character, type: NOTIFICATION_TYPE) {
    console.log('Storing notification to db', type);

    const notification = new Notification();
    notification.type = type;
    notification.recipient = recipient;

    await this.notificationRepository.save(notification);

    this.notificationGateway.sendNotificationToCharacter(recipient, notification);
  }

}
