import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { PostRepository } from '../../post.repository';
import { CreatePostCommand } from '../create.command';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(CreatePostCommand)
export class CreatePostCommandHandler implements ICommandHandler<CreatePostCommand> {
  constructor(
    @InjectRepository(PostRepository)
    private readonly repository: PostRepository,
    private readonly publisher: EventPublisher,
  ) {
  }

  async execute(command: CreatePostCommand, resolve: (value?) => void) {
    const { post } = command;
    const entity = this.publisher.mergeObjectContext(
      await this.repository.save(post),
    );

    // Sends actual event
    await entity.create();

    entity.commit();
    resolve(entity);
  }
}
