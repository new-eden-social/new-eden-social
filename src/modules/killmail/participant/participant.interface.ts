import { ICharacterResponse } from '../../character/character.interface';

export interface IParticipantResponse {
  shipId?: number;
  weaponId?: number;
  damageDone?: number;
  damageTaken?: number;
  finalBlow?: boolean;
  character: ICharacterResponse;
}
