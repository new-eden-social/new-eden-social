import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationRepository } from '../../notification.repository';
import { SeenNotificationCommand } from '../seen.command';

@CommandHandler(SeenNotificationCommand)
export class SeenNotificationCommandHandler implements ICommandHandler<SeenNotificationCommand> {
  constructor(
    @InjectRepository(NotificationRepository)
    private readonly repository: NotificationRepository,
    private readonly publisher: EventPublisher,
  ) {
  }

  async execute(command: SeenNotificationCommand) {
    const { notification } = command;

    const entity = this.publisher.mergeObjectContext(
      await this.repository.markAsSeen(notification),
    );

    // Sends actual event
    await entity.seen();

    entity.commit();
  }
}
