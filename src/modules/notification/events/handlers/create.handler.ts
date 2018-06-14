import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedNotificationEvent } from '../create.event';
import { WebsocketGateway } from '../../../websocket/websocket.gateway';
import { DWsNotificationEvent } from '../../notification.dto';

@EventsHandler(CreatedNotificationEvent)
export class CreatedNotificationHandler implements IEventHandler<CreatedNotificationEvent> {

  constructor(
    private websocketGateway: WebsocketGateway,
  ) {
  }

  async handle(event: CreatedNotificationEvent) {
    this.websocketGateway.sendEventToCharacter(
      event.notification.recipient,
      new DWsNotificationEvent(event.notification),
    );
  }

}
