import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { WebsocketGateway } from '../../../websocket/websocket.gateway';
import { DWsNotificationSeenEvent } from '../../notification.dto';
import { SeenNotificationEvent } from '../seen.event';

@EventsHandler(SeenNotificationEvent)
export class SeenNotificationHandler implements IEventHandler<SeenNotificationEvent> {

  constructor(
    private websocketGateway: WebsocketGateway,
  ) {
  }

  async handle(event: SeenNotificationEvent) {
    console.log('seen event handler');
    this.websocketGateway.sendEventToCharacter(
      event.notification.recipient,
      new DWsNotificationSeenEvent(event.notification),
    );
  }

}
