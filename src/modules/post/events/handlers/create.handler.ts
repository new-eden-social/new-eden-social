import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatePostEvent } from '../create.event';

@EventsHandler(CreatePostEvent)
export class CreatePostHandler implements IEventHandler<CreatePostEvent> {
  handle(event: CreatePostEvent) {
    console.log('CreatePostEvent handler');
  }
}
