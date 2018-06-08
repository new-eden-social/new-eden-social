import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CharacterCreatedPostEvent } from '../create.event';

@EventsHandler(CharacterCreatedPostEvent)
export class CharacterCreatedPostEventHandler implements IEventHandler<CharacterCreatedPostEvent> {
  handle(event: CharacterCreatedPostEvent) {
    console.log('CharacterCreatedPostEvent handler');
  }
}
