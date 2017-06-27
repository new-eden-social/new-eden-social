declare module Eve {

  interface GetAlliance {
    readonly id: number,
    readonly ticker: string,
    readonly alliance_name: string,
    readonly executor_corp: number,
    readonly date_founded: Date,
  }

  interface GetCorporation {
    readonly id: number,
    readonly ticker: string,
    readonly corporation_name: string,
    readonly corporation_description: string,
    readonly url: string,
    readonly creator_id: number,
    readonly ceo_id: number,
    readonly alliance_id: number,
    readonly creation_date: Date,
    readonly member_count: number,
    readonly tax_rate: number,
  }

  interface GetCharacter {
    readonly id: number,
    readonly name: string,
    readonly description: string,
    readonly gender: string,
    readonly birthday: Date,
    readonly race_id: number,
    readonly ancestry_id: number,
    readonly bloodline_id: number,
    readonly corporation_id: number,
  }

  interface Search {
    readonly agent?: Array<number>,
    readonly alliance?: Array<number>,
    readonly character?: Array<number>,
    readonly constellation?: Array<number>,
    readonly corporation?: Array<number>,
    readonly faction?: Array<number>,
    readonly inventorytype?: Array<number>,
    readonly region?: Array<number>,
    readonly solarsystem?: Array<number>,
    readonly station?: Array<number>,
    readonly wormhole?: Array<number>
  }

  interface AllianceName {
    readonly alliance_id: number,
    readonly alliance_name: string,
  }

  interface CharacterName {
    readonly alliance_id: number,
    readonly alliance_name: string,
  }

  interface CorporationName {
    readonly alliance_id: number,
    readonly alliance_name: string,
  }

}

export = Eve
