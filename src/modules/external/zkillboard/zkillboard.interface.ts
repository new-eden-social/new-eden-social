declare module zKillboard {

  interface AllianceStatistics {
    readonly id: number;
    readonly allTimeSum: number;
    readonly groups: any;
    readonly hasSupers: boolean;
    readonly iskDestroyed: number;
    readonly iskLost: number;
    readonly months: any;
    readonly pointsDestroyed: number;
    readonly pointsLost: number;
    readonly shipsDestroyed: number;
    readonly shipsLost: number;
    readonly soloKills: number;
    readonly soloLosses: number;
    readonly supers: any;
    readonly topAllTime: any;
    readonly type: string;
    readonly activepvp: any;
    readonly info: {
      readonly id: number;
      readonly name: string;
      readonly type: string;
      readonly ticker: string;
      readonly memberCount: number;
      readonly corpCount: number;
      readonly factionID: number;
      readonly executorCorpID: number;
      readonly killID: number;
      readonly lastApiUpdate: {
        readonly sec: number;
        readonly usec: number;
      };
    };
  }

  interface CorporationStatistics {
    readonly id: number;
    readonly allTimeSum: number;
    readonly groups: any;
    readonly hasSupers: boolean;
    readonly iskDestroyed: number;
    readonly iskLost: number;
    readonly months: any;
    readonly pointsDestroyed: number;
    readonly pointsLost: number;
    readonly shipsDestroyed: number;
    readonly shipsLost: number;
    readonly soloKills: number;
    readonly soloLosses: number;
    readonly supers: any;
    readonly topAllTime: any;
    readonly type: string;
    readonly activepvp: any;
    readonly info: {
      readonly id: number;
      readonly name: string;
      readonly type: string;
      readonly ticker: string;
      readonly memberCount: number;
      readonly allianceID: number;
      readonly factionID: number;
      readonly ceoID: number;
      readonly killID: number;
      readonly lastApiUpdate: {
        readonly sec: number;
        readonly usec: number;
      };
    };
  }

  interface CharacterStatistics {
    readonly id: number;
    readonly calcTrophies: boolean;
    readonly iskDestroyed: number;
    readonly iskLost: number;
    readonly months: any;
    readonly pointsDestroyed: number;
    readonly pointsLost: number;
    readonly sequence: number;
    readonly shipsDestroyed: number;
    readonly shipsLost: number;
    readonly soloKills: number;
    readonly soloLosses: number;
    readonly topAllTime: any;
    readonly type: string;
    readonly activepvp: any;
    readonly info: {
      readonly id: number;
      readonly name: string;
      readonly type: string;
      readonly secStatus: number;
      readonly allianceID: number;
      readonly corporationID: number;
      readonly factionID: number;
      readonly killID: number;
      readonly lastApiUpdate: {
        readonly sec: number;
        readonly usec: number;
      };
    };
  }
}

export = zKillboard;
