import { ICommand } from '@nestjs/cqrs';
import { Post } from '../post.entity';

export class CreatePostCommand implements ICommand {
  constructor(public readonly post: Post) {}
}
