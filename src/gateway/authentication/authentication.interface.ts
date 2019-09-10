import { ICharacterResponse } from '@new-eden-social/services-character';

export interface IAuthenticatedRequest extends Request {
  character: ICharacterResponse;
}
