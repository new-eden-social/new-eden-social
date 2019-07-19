import { Character } from '@new-eden-soci@new-eden-social/api-character';

export interface IAuthenticatedRequest extends Request {
  character: Character;
}
