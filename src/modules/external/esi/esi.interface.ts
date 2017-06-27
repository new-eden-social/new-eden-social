declare module ESI {

  interface GetAlliance {
    readonly id: number;
    readonly ticker: string;
    readonly alliance_name: string;
    readonly executor_corp: number;
    readonly date_founded: Date;
  }

  interface GetCorporation {
    readonly id: number;
    readonly ticker: string;
    readonly corporation_name: string;
    readonly corporation_description: string;
    readonly url: string;
    readonly creator_id: number;
    readonly ceo_id: number;
    readonly alliance_id: number;
    readonly creation_date: Date;
    readonly member_count: number;
    readonly tax_rate: number;
  }

  interface GetCharacter {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly gender: string;
    readonly birthday: Date;
    readonly security_status: number;
    readonly race_id: number;
    readonly ancestry_id: number;
    readonly bloodline_id: number;
    readonly corporation_id: number;
  }

  interface Search {
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

  interface AllianceName {
    readonly alliance_id: number;
    readonly alliance_name: string;
  }

  interface CharacterName {
    readonly character_id: number;
    readonly character_name: string;
  }

  interface CorporationName {
    readonly corporation_id: number;
    readonly corporation_name: string;
  }

}

export = ESI;
