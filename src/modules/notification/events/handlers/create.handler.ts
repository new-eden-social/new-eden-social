import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreateNotificationEvent } from '../create.event';
import { WebsocketGateway } from '../../../websocket/websocket.gateway';
import { DWsNotificationEvent } from '../../notification.dto';

@EventsHandler(CreateNotificationEvent)
export class CreateNotificationEventHandler implements IEventHandler<CreateNotificationEvent> {

  constructor(
    private websocketGateway: WebsocketGateway,
  ) {
  }

  async handle(event: CreateNotificationEvent) {
    this.websocketGateway.sendEventToCharacter(
      event.notification.recipient,
      new DWsNotificationEvent(event.notification),
    );
  }

}
