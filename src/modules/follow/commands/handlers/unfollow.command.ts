import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowRepository } from '../../follow.repository';
import { UnFollowCommand } from '../unfollow.command';

@CommandHandler(UnFollowCommand)
export class UnFollowCommandHandler implements ICommandHandler<UnFollowCommand> {
  constructor(
    @InjectRepository(FollowRepository)
    private readonly repository: FollowRepository,
    private readonly publisher: EventPublisher,
  ) {
  }

  async execute(command: UnFollowCommand, resolve: (value?) => void) {
    const { follow } = command;

    // Sends actual event
    await follow.unFollow();

    follow.commit();

    await this.repository.delete(follow.id);

    resolve(follow);
  }
}
