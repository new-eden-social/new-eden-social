import { ICharacterResponse } from '../character/character.interface';

export interface IPostResponse {
  id: string;
  content: string;
  type: string;

  character?: ICharacterResponse;
}
