import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Notification } from '../../../notification/notification.entity';
import * as uuidv4 from 'uuid/v4';
import { CreateNotificationCommand } from '../../../notification/commands/create.command';
import { CharacterService } from '../../../character/character.service';
import { CreateCommentEvent } from '../create.event';
import { PostService } from '../../../post/post.service';
import { Character } from '../../../character/character.entity';
import { NOTIFICATION_TYPE } from '../../../notification/notification.constants';

@EventsHandler(CreateCommentEvent)
export class CreateCommentEventHandler implements IEventHandler<CreateCommentEvent> {

  constructor(
    private commandBus: CommandBus,
    private postService: PostService,
    private characterService: CharacterService,
  ) {
  }

  async handle(event: CreateCommentEvent) {
    const participants = await this.postService.getParticipants(event.comment.post);
    const eventUuid = uuidv4();

    const joinedParticipants: Character[] = [
      ...participants.characters,
    ];

    // for (const corporation of participants.corporations) {
    //   const characters = await this.characterService.findInCorporation(corporation);
    //   characters.forEach(character => joinedParticipants.push(character));
    // }
    //
    // for (const alliance of participants.alliances) {
    //   const characters = await this.characterService.findInAlliance(alliance);
    //   characters.forEach(character => joinedParticipants.push(character));
    // }
    //
    // // Put comment authors on blacklist
    // const commentAuthors: Character[] = [];
    // if (event.comment.character) {
    //   commentAuthors.push(event.comment.character);
    // }
    // if (event.comment.corporation) {
    //   const characters = await this.characterService.findInCorporation(event.comment.corporation);
    //   characters.forEach(character => commentAuthors.push(character));
    // }
    // if (event.comment.alliance) {
    //   const characters = await this.characterService.findInAlliance(event.comment.alliance);
    //   characters.forEach(character => commentAuthors.push(character));
    // }

    // Create notification for all the characters
    for (const participant of joinedParticipants.filter((v, i, a) => a.indexOf(v) === i)) {
      // If on blacklist, skip him
      // if (commentAuthors.find(c => c.id === participant.id)) {
      //   continue;
      // }
      const notification = new Notification();
      notification.eventUuid = eventUuid;
      notification.senderCharacter = event.comment.character;
      notification.recipient = participant;
      notification.comment = event.comment;
      // TODO: Determine if `participant` is creator of post, if so, use other notification
      notification.type = NOTIFICATION_TYPE.NEW_COMMENT_ON_A_POST_YOU_COMMENTED;
      // Execute create notification command
      await this.commandBus.execute(new CreateNotificationCommand(notification));
    }

  }
}
