import { DCorporationShort } from '../corporation/corporation.dto';
import { Character } from './character.entity';
import { ICharacterPortrait } from './character.interface';
import { DPagination } from '../core/pagination/paggination.dto';
import { ApiModelProperty } from '@nestjs/swagger';
import { Follow } from '../follow/follow.entity';
import { DFollow } from '../follow/follow.dto';

export class DCharacterPortrait {
  @ApiModelProperty()
  px64x64: string;
  @ApiModelProperty()
  px128x128: string;
  @ApiModelProperty()
  px256x256: string;
  @ApiModelProperty()
  px512x512: string;

  constructor(portrait: ICharacterPortrait) {
    this.px64x64 = portrait.px64x64;
    this.px128x128 = portrait.px128x128;
    this.px256x256 = portrait.px256x256;
    this.px512x512 = portrait.px512x512;
  }
}

export class DCharacterShort {
  @ApiModelProperty()
  id: number;
  @ApiModelProperty()
  handle: string;
  @ApiModelProperty()
  name: string;
  @ApiModelProperty()
  description: string;
  @ApiModelProperty()
  gender: string;
  @ApiModelProperty()
  raceId: number;
  @ApiModelProperty()
  bloodlineId: number;
  @ApiModelProperty()
  ancestryId?: number;
  @ApiModelProperty()
  securityStatus: number;
  @ApiModelProperty()
  portrait: DCharacterPortrait;
  @ApiModelProperty()
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
  @ApiModelProperty()
  id: number;
  @ApiModelProperty()
  handle: string;
  @ApiModelProperty()
  name: string;
  @ApiModelProperty()
  description: string;
  @ApiModelProperty()
  gender: string;
  @ApiModelProperty()
  raceId: number;
  @ApiModelProperty()
  bloodlineId: number;
  @ApiModelProperty()
  ancestryId?: number;
  @ApiModelProperty()
  securityStatus: number;
  @ApiModelProperty()
  portrait: DCharacterPortrait;
  @ApiModelProperty()
  corporation: DCorporationShort;
  @ApiModelProperty()
  followers: DFollow[];
  @ApiModelProperty()
  following: DFollow[];
  @ApiModelProperty()
  numPosts: number;

  constructor(character: Character, followers: Follow[], following: Follow[], numPosts: number) {
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
    this.followers = followers.map(follow => new DFollow(follow))
    this.following = following.map(follow => new DFollow(follow))
    this.numPosts = numPosts;
  }
}

export class DCharacterList extends DPagination<DCharacterShort> {
  constructor(characters: Character[], page: number, perPage: number, count: number) {
    const formattedCharacters = characters.map(character => new DCharacterShort(character));
    super(formattedCharacters, page, perPage, count);
  }
}
