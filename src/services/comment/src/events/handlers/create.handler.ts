import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import * as uuidv4 from 'uuid/v4';
import { CreateCommentEvent } from '../create.event';

@EventsHandler(CreateCommentEvent)
export class CreateCommentEventHandler implements IEventHandler<CreateCommentEvent> {

  constructor(
    private readonly commandBus: CommandBus,
  ) {
  }

  async handle(event: CreateCommentEvent) {
    const participants = await this.postService.getParticipants(event.comment.post);
    const eventUuid = uuidv4();

    const joinedParticipants: Character[] = [
      ...participants.characters,
    ].filter((v, i, a) => a.findIndex(v1 => v1.id === v.id) === i);

    // Create notification for all the characters
    for (const participant of joinedParticipants) {
      // Skip event comment author
      if (event.comment.character && participant.id === event.comment.character.id) {
        continue;
      }
      const notification = new Notification();
      notification.eventUuid = eventUuid;
      notification.senderCharacter = event.comment.character;
      notification.recipient = participant;
      notification.comment = event.comment;
      notification.post = event.comment.post;
      notification.type = NOTIFICATION_TYPE.NEW_COMMENT_ON_A_POST_YOU_PARTICIPATE;
      // Execute create notification command
      await this.commandBus.execute(new CreateNotificationCommand(notification));
    }

    // Send comment to subscribers
    this.websocketGateway.sendEventToPostCommentSub<DComment>(
      event.comment.post,
      new DComment(event.comment),
    );
  }
}
