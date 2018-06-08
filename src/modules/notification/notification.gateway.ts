import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway()
export class NotificationGateway {
  @WebSocketServer() server;


  public sendEventToCharacter(characterId: string, notification: any): void {
    // TODO We need notification DTO!
    this.server.to(characterId).emit(notification);
  }
}
