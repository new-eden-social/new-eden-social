import {
  IAllianceName,
  ICharacterName,
  ICorporationName,
} from '../common/external/esi/esi.interface';

export class DSearch {
  characters: ICharacterName[];
  corporations: ICorporationName[];
  alliances: IAllianceName[];

  constructor(data: {
    characters: ICharacterName[],
    corporations: ICorporationName[],
    alliances: IAllianceName[],
  }) {
    this.characters = data.characters;
    this.corporations = data.corporations;
    this.alliances = data.alliances;
  }
}