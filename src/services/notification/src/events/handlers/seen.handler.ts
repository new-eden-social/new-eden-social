import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SeenNotificationEvent } from '../seen.event';

@EventsHandler(SeenNotificationEvent)
export class SeenNotificationEventHandler implements IEventHandler<SeenNotificationEvent> {

  constructor(
  ) {
  }

  async handle(event: SeenNotificationEvent) {
    this.websocketGateway.sendEventToCharacter(
      event.notification.recipient,
      new DWsNotificationSeenEvent(event.notification),
    );
  }

}
