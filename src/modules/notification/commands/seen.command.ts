import { ICommand } from '@nestjs/cqrs';
import { Notification } from '../notification.entity';

export class SeenNotificationCommand implements ICommand {
  constructor(public readonly notification: Notification) {
  }
}
