import { ICharacterEntity } from '@new-eden-social/api-character';

export interface IAuthenticatedRequest extends Request {
  character: ICharacterEntity;
}
