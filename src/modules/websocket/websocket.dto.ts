import { DCharacterShort } from '../character/character.dto';
import { Character } from '../character/character.entity';
import { WS_EVENT_AUTHENTICATION } from './websocket.constants';
import { WsResponse } from '@nestjs/websockets';

export class DWsAuthentication implements WsResponse<DCharacterShort> {
  event: string = WS_EVENT_AUTHENTICATION;
  data: DCharacterShort;

  constructor(character: Character) {
    this.data = new DCharacterShort(character);
  }
}
