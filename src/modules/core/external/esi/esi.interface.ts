export enum Categories {
  character = 'character',
  corporation = 'corporation',
  alliance = 'alliance',
  station = 'station',
  constellation = 'constellation',
  region = 'region',
  solar_system = 'solar_system',
}

export interface IGetAlliance {
  readonly id: number;
  readonly ticker: string;
  readonly name: string;
  readonly creator_id: number;
  readonly creator_corporation_id: number;
  readonly executor_corporation_id: number;
  readonly date_founded: Date;
}

export interface IGetCorporation {
  readonly id: number;
  readonly ticker: string;
  readonly name: string;
  readonly description: string;
  readonly creator_id: number;
  readonly ceo_id: number;
  readonly alliance_id: number;
  readonly creation_date: Date;
  readonly member_count: number;
  readonly tax_rate: number;
}

export interface IGetCharacter {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly gender: string;
  readonly birthday: Date;
  readonly security_status: number;
  readonly race_id: number;
  readonly ancestry_id?: number;
  readonly bloodline_id: number;
  readonly corporation_id: number;
}

export interface IGetCharacterPortrait {
  readonly px64x64: string;
  readonly px128x128: string;
  readonly px256x256: string;
  readonly px512x512: string;
}

export interface IGetCharacterRoles {
  roles: string[];
}

export interface ISearch {
  readonly agent?: number[];
  readonly alliance?: number[];
  readonly character?: number[];
  readonly constellation?: number[];
  readonly corporation?: number[];
  readonly faction?: number[];
  readonly inventorytype?: number[];
  readonly region?: number[];
  readonly solarsystem?: number[];
  readonly station?: number[];
  readonly wormhole?: number[];
}

export interface IUniverseName {
  readonly id: number;
  readonly name: string;
  readonly category: Categories;
}

export interface IUniverseNames extends Array<IUniverseName> {
}

export interface IUniverseType {
  readonly type_id: number;
  readonly name: string;
  readonly description: string;
  readonly published: boolean;
  readonly group_id: number;
}

export interface IUniverseGroup {
  readonly group_id: number;
  readonly name: string;
  readonly published: boolean;
  readonly category_id: number;
  readonly types: number[];
}

export interface IUniverseCategory {
  readonly category_id: number;
  readonly name: string;
  readonly published: boolean;
  readonly groups: number[];
}

export interface IAllianceName {
  readonly alliance_id: number;
  readonly alliance_name: string;
}

export interface ICharacterName {
  readonly character_id: number;
  readonly character_name: string;
}

export interface ICorporationName {
  readonly corporation_id: number;
  readonly corporation_name: string;
}

