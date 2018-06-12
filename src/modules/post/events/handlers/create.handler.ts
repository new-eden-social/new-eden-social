import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CharacterCreatedPostEvent } from '../create.event';
import { NotificationService } from '../../../notification/notification.service';
import { NOTIFICATION_TYPE } from '../../../notification/notification.constants';

@EventsHandler(CharacterCreatedPostEvent)
export class CharacterCreatedPostEventHandler implements IEventHandler<CharacterCreatedPostEvent> {

  constructor(
    private notificationService: NotificationService,
  ) {
  }

  async handle(event: CharacterCreatedPostEvent) {
    await this.notificationService.createNotificationForNewPost(
      event.post.characterWall,
      NOTIFICATION_TYPE.NOTIFICATION_NEW_POST_ON_YOUR_WALL);
  }
}
