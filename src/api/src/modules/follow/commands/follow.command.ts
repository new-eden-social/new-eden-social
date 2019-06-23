import { ICommand } from '@nestjs/cqrs';
import { Follow } from '../follow.entity';

export class FollowCommand implements ICommand {
  constructor(public readonly follow: Follow) {}
}
