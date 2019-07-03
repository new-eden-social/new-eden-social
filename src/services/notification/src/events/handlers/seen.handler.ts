import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { WebsocketGateway } from '../../../websocket/websocket.gateway';
import { DWsNotificationSeenEvent } from '../../notification.dto';
import { SeenNotificationEvent } from '../seen.event';

@EventsHandler(SeenNotificationEvent)
export class SeenNotificationEventHandler implements IEventHandler<SeenNotificationEvent> {

  constructor(
    private readonly websocketGateway: WebsocketGateway,
  ) {
  }

  async handle(event: SeenNotificationEvent) {
    this.websocketGateway.sendEventToCharacter(
      event.notification.recipient,
      new DWsNotificationSeenEvent(event.notification),
    );
  }

}
