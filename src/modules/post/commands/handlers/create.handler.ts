import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { PostRepository } from '../../post.repository';
import { CreatePostCommand } from '../create.command';
import { Inject } from '@nestjs/common';
import { POST_REPOSITORY_TOKEN } from '../../post.constants';

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(
    @Inject(POST_REPOSITORY_TOKEN)
    private readonly repository: PostRepository,
    private readonly publisher: EventPublisher,
  ) {
  }

  async execute(command: CreatePostCommand, resolve: (value?) => void) {
    const { post } = command;
    const entity = this.publisher.mergeObjectContext(
      await this.repository.save(post),
    );
    entity.commit();
    resolve();
  }
}
