import { FollowCommandHandler } from './follow.command';
import { UnFollowCommandHandler } from './unfollow.command';

export const commandHandlers = [
  FollowCommandHandler,
  UnFollowCommandHandler,
];
