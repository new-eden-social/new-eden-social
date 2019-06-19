import { DCharacter } from './character.dto';

export interface ICharacterState {
  single: {
    [key: string]: DCharacter,
  };
}
