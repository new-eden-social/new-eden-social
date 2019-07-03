import { CreateNotificationCommandHandler } from './create.handler';
import { SeenNotificationCommandHandler } from './seen.handler';

export const commandHandlers = [
  CreateNotificationCommandHandler,
  SeenNotificationCommandHandler,
];
