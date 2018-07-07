import { IEvent } from '@nestjs/cqrs';
import { Notification } from '../notification.entity';

export class CreateNotificationEvent implements IEvent {
  constructor(public readonly notification: Notification) {
  }
}
