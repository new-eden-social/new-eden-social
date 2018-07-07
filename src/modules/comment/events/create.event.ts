import { IEvent } from '@nestjs/cqrs';
import { Comment } from '../comment.entity';

export class CreateCommentEvent implements IEvent {
  constructor(public readonly comment: Comment) {
  }
}
