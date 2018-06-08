import { IEvent } from '@nestjs/cqrs';
import { Post } from '../post.entity';

export class CharacterCreatedPostEvent implements IEvent {
  constructor(public readonly post: Post) {}
}
