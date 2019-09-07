import { ICharacterResponse } from '@new-eden-social/api-character';

export interface IAuthenticatedRequest extends Request {
  character: ICharacterResponse;
}
