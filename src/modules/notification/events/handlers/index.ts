import { CreatedNotificationHandler } from './create.handler';
import { SeenNotificationHandler } from './seen.handler';

export const eventHandlers = [
  CreatedNotificationHandler,
  SeenNotificationHandler,
];
