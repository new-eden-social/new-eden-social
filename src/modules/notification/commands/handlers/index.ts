import { CreateNotificationHandler } from './create.handler';
import { SeenNotificationHandler } from './seen.handler';

export const commandHandlers = [
  CreateNotificationHandler,
  SeenNotificationHandler,
];
