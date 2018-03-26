import { DCorporationShort } from '../corporation/corporation.dto';
import { Character } from './character.entity';
import { ICharacterPortrait } from './character.interface';
import { DPagination } from '../core/pagination/paggination.dto';
import { ICharacterName } from '../core/external/esi/esi.interface';

export class DCharacterPortrait {
  px64x64: string;
  px128x128: string;
  px256x256: string;
  px512x512: string;

  constructor(portrait: ICharacterPortrait) {
    this.px64x64 = portrait.px64x64;
    this.px128x128 = portrait.px128x128;
    this.px256x256 = portrait.px256x256;
    this.px512x512 = portrait.px512x512;
  }
}

export class DCharacterName {
  id: number;
  name: string;

  constructor(character: ICharacterName) {
    this.id = character.character_id;
    this.name = character.character_name;
  }
}

export class DCharacterShort {
  id: number;
  handle: string;
  name: string;
  description: string;
  gender: string;
  raceId: number;
  bloodlineId: number;
  ancestryId?: number;
  securityStatus: number;
  portrait: DCharacterPortrait;
  corporation: DCorporationShort;

  constructor(character: Character) {
    this.id = character.id;
    this.handle = character.handle;
    this.name = character.name;
    this.description = character.description;
    this.gender = character.gender;
    this.raceId = character.raceId;
    this.bloodlineId = character.bloodlineId;
    this.ancestryId = character.ancestryId;
    this.securityStatus = character.securityStatus;
    this.portrait = new DCharacterPortrait(character.portrait);
    this.corporation = new DCorporationShort(character.corporation);
  }
}

export class DCharacter {
  id: number;
  handle: string;
  name: string;
  description: string;
  gender: string;
  raceId: number;
  bloodlineId: number;
  ancestryId?: number;
  securityStatus: number;
  portrait: DCharacterPortrait;
  corporation: DCorporationShort;

  /* LIVE Data*/
  iskDestroyed: number;
  iskLost: number;
  pointsDestroyed: number;
  pointsLost: number;
  shipsDestroyed: number;
  shipsLost: number;
  soloKills: number;
  soloLosses: number;

  constructor(character: Character) {
    this.id = character.id;
    this.handle = character.handle;
    this.name = character.name;
    this.description = character.description;
    this.gender = character.gender;
    this.raceId = character.raceId;
    this.bloodlineId = character.bloodlineId;
    this.ancestryId = character.ancestryId;
    this.securityStatus = character.securityStatus;
    this.portrait = new DCharacterPortrait(character.portrait);
    this.corporation = new DCorporationShort(character.corporation);

    this.iskDestroyed = character.iskDestroyed;
    this.iskLost = character.iskLost;
    this.pointsDestroyed = character.pointsDestroyed;
    this.pointsLost = character.pointsLost;
    this.shipsLost = character.shipsLost;
    this.shipsDestroyed = character.shipsDestroyed;
    this.soloKills = character.soloKills;
    this.soloLosses = character.soloLosses;
  }
}

export class DCharacterList extends DPagination<DCharacterShort> {
  constructor(characters: Character[], page: number, perPage: number, count: number) {
    const formattedCharacters = characters.map(character => new DCharacterShort(character));
    super(formattedCharacters, page, perPage, count);
  }
}
