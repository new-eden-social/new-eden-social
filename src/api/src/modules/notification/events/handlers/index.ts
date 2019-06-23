import { CreateNotificationEventHandler } from './create.handler';
import { SeenNotificationEventHandler } from './seen.handler';

export const eventHandlers = [
  CreateNotificationEventHandler,
  SeenNotificationEventHandler,
];
