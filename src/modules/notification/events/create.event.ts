import { IEvent } from '@nestjs/cqrs';
import { Notification } from '../notification.entity';

export class CreatedNotificationEvent implements IEvent {
  constructor(public readonly notification: Notification) {
  }
}
