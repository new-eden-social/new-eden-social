import { Character } from '../character/character.entity';

export interface IAuthenticatedRequest extends Request {
  character: Character;
}
