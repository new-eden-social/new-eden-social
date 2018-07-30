import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowCommand } from '../follow.command';
import { FollowRepository } from '../../follow.repository';

@CommandHandler(FollowCommand)
export class FollowCommandHandler implements ICommandHandler<FollowCommand> {
  constructor(
    @InjectRepository(FollowRepository)
    private readonly repository: FollowRepository,
    private readonly publisher: EventPublisher,
  ) {
  }

  async execute(command: FollowCommand, resolve: (value?) => void) {
    const { follow } = command;
    const entity = this.publisher.mergeObjectContext(
      await this.repository.save(follow),
    );

    // Sends actual event
    await entity.follow();

    entity.commit();
    resolve(entity);
  }
}
