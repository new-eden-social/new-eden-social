import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentCommand } from '../create.command';
import { CommentRepository } from '../../comment.repository';

@CommandHandler(CreateCommentCommand)
export class CreateCommentCommandHandler implements ICommandHandler<CreateCommentCommand> {
  constructor(
    @InjectRepository(CommentRepository)
    private readonly repository: CommentRepository,
    private readonly publisher: EventPublisher,
  ) {
  }

  async execute(command: CreateCommentCommand) {
    const { comment } = command;
    const entity = this.publisher.mergeObjectContext(
      await this.repository.save(comment),
    );

    // Sends actual event
    await entity.create();

    entity.commit();
  }
}
