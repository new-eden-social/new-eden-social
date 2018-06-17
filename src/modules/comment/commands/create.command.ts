import { ICommand } from '@nestjs/cqrs';
import { Comment } from '../comment.entity';

export class CreateCommentCommand implements ICommand {
  constructor(public readonly comment: Comment) {}
}
