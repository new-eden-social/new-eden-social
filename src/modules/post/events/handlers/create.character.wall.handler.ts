import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import {
  CharacterPostedOnAllianceWallEvent,
  CharacterPostedOnCharacterWallEvent, CharacterPostedOnCorporationWallEvent,
  CharacterPostedOnWallEvent,
} from '../create.character.event';
import { NOTIFICATION_TYPE } from '../../../notification/notification.constants';
import { Character } from '../../../character/character.entity';
import { Notification } from '../../../notification/notification.entity';
import * as uuidv4 from 'uuid/v4';
import { CreateNotificationCommand } from '../../../notification/commands/create.command';

@EventsHandler(
  CharacterPostedOnCharacterWallEvent,
  CharacterPostedOnCorporationWallEvent,
  CharacterPostedOnAllianceWallEvent,
)
export class CharacterPostedOnWallEventHandler
  implements IEventHandler<CharacterPostedOnWallEvent> {

  constructor(
    private commandBus: CommandBus,
  ) {
  }

  async handle(event: CharacterPostedOnWallEvent) {
    const notificationType = this.notificationType(event);
    const characters = await this.getCharactersToReceiveNotification(event, notificationType);
    const eventUuid = uuidv4();

    // Create notification for all the characters
    for (const character of characters) {
      const notification = new Notification();
      notification.eventUuid = eventUuid;
      notification.senderCharacter = event.post.character;
      notification.post = event.post;
      notification.recipient = character;
      notification.type = notificationType;
      // Execute create notification command
      await this.commandBus.execute(new CreateNotificationCommand(notification));
    }

  }

  notificationType(event: CharacterPostedOnWallEvent): NOTIFICATION_TYPE {
    if (event instanceof CharacterPostedOnCharacterWallEvent) {
      return NOTIFICATION_TYPE.NEW_POST_ON_YOUR_WALL;
    }
    if (event instanceof CharacterPostedOnCorporationWallEvent) {
      return NOTIFICATION_TYPE.NEW_POST_ON_YOUR_CORPORATION_WALL;
    }
    if (event instanceof CharacterPostedOnAllianceWallEvent) {
      return NOTIFICATION_TYPE.NEW_POST_ON_YOUR_ALLIANCE_WALL;
    }
  }

  async getCharactersToReceiveNotification(
    event: CharacterPostedOnWallEvent,
    notificationType: NOTIFICATION_TYPE,
  ): Promise<Character[]> {
    switch (notificationType) {
      case NOTIFICATION_TYPE.NEW_POST_ON_YOUR_WALL:
        return [event.post.characterWall];
      // case NOTIFICATION_TYPE.NEW_POST_ON_YOUR_CORPORATION_WALL:
      //   return await this.characterService.findInCorporation(event.post.corporationWall);
      // case NOTIFICATION_TYPE.NEW_POST_ON_YOUR_ALLIANCE_WALL:
      //   return await this.characterService.findInAlliance(event.post.allianceWall);
    }
  }
}
