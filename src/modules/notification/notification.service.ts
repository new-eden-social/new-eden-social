import { Injectable } from '@nestjs/common';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { NOTIFICATION_TYPE } from './notification.constants';
import { Character } from '../character/character.entity';
import { NotificationRepository } from './notification.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { DWsNotificationEvent } from './notification.dto';

@Injectable()
export class NotificationService {

  constructor(
    @InjectRepository(NotificationRepository)
    private notificationRepository: NotificationRepository,
    private notificationGateway: WebsocketGateway,
  ) {
  }

  public async createNotificationForNewPost(recipient: Character, type: NOTIFICATION_TYPE) {

    const notification = new Notification();
    notification.type = type;
    notification.recipient = recipient;

    await this.notificationRepository.save(notification);

    this.notificationGateway.sendEventToCharacter(
      recipient,
      new DWsNotificationEvent(notification));
  }

}
