import { DCharacterName } from '../character/character.dto';
import { DCorporationName } from '../corporation/corporation.dto';
import { DAllianceName } from '../alliance/alliance.dto';

import {
  IAllianceName,
  ICharacterName,
  ICorporationName,
} from '../core/external/esi/esi.interface';

export class DSearch {
  characters: DCharacterName[];
  corporations: DCorporationName[];
  alliances: DAllianceName[];

  constructor(data: {
    characters: ICharacterName[],
    corporations: ICorporationName[],
    alliances: IAllianceName[],
  }) {
    this.characters = data.characters.map(character => new DCharacterName(character));
    this.corporations = data.corporations.map(corporation => new DCorporationName(corporation));
    this.alliances = data.alliances.map(alliance => new DAllianceName(alliance));
  }
}
