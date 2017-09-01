import { ICharacterResponse } from '../../character/character.interface';

export interface IKillmailResponse {
  id: string,
  content: string,
  type: string,

  character?: ICharacterResponse,
}