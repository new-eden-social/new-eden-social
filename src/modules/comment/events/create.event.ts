import { IEvent } from '@nestjs/cqrs';
import { Comment } from '../comment.entity';

export class CreatedCommentEvent implements IEvent {
  constructor(public readonly comment: Comment) {
  }
}
