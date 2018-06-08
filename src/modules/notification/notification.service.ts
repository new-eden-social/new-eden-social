import { Injectable } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
import { NOTIFICATION_TYPE } from './notification.constants';

@Injectable()
export class NotificationService {

  constructor(
    private notificationGateway: NotificationGateway,
  ) {
  }

  public async createNotification(recipientIds: string[], type: NOTIFICATION_TYPE) {
    // TODO: Store to db and then broadcast to sockets
    recipientIds.forEach(
      characterId => this.notificationGateway.sendEventToCharacter(characterId, type));
  }
}
