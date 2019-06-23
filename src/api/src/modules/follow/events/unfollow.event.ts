import { IEvent } from '@nestjs/cqrs';
import { Follow } from '../follow.entity';

export class UnFollowEvent implements IEvent {
  constructor(public readonly follow: Follow) {
  }
}
