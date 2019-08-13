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

  async execute(command: UnFollowCommand) {
    const { follow } = command;

    await follow.unFollow();
    await this.repository.delete(follow.id);

    follow.commit();
  }
}
