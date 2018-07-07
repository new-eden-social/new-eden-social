import { IEvent } from '@nestjs/cqrs';
import { Post } from '../post.entity';

export class PostedEvent implements IEvent {
  constructor(public readonly post: Post) {
  }
}
