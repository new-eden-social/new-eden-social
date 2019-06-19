
export interface IKillmailRawWithoutZKB {
  readonly killmail_id: number;
  readonly killmail_time: string;
  readonly attackers: {
    readonly character_id: number;
    readonly corporation_id: number;
    readonly alliance_id?: number;
    readonly faction_id: number;
    readonly ship_type_id: number;
    readonly weapon_type_id: number;
    readonly damage_done: number;
    readonly security_status: number;
    readonly final_blow: boolean;
  }[];
  readonly victim: {
    readonly character_id: number;
    readonly corporation_id: number;
    readonly alliance_id?: number;
    readonly damage_taken: number;
    readonly ship_type_id: number;
    readonly position: {
      readonly x: number;
      readonly y: number;
      readonly z: number;
    }
    readonly items: {
      readonly singleton: number;
      readonly itemType: {
        readonly href: string;
        readonly id: number;
        readonly name: string;
        readonly icon: {
          readonly href: string;
        };
      };
      readonly quantityDestroyed: number;
      readonly flag: number;
    }[]
  };
  readonly war?: {
    readonly id: number;
    readonly href: string;
  }
}

export interface IKillmailRaw extends IKillmailRawWithoutZKB {
  readonly zkb: {
    readonly hash: string;
    readonly locationID: number;
    readonly fittedValue: number;
    readonly totalValue: number;
    readonly points: number;
    readonly npc?: boolean;
    readonly solo: boolean;
    readonly awox: boolean;
    readonly href: string;
  };
}

export interface IKillmail {
  id: number;
  date: Date;
  warId: number;
  locationId: number;
  totalValue: number;
  points: number;
  npc: boolean;
  attackers: IKillmailAttacker[];
  victim: IKillmailVictim;
}

export interface IKillmailAttacker {
  id?: number; // NPC's don't have ids
  shipId?: number;
  weaponId?: number; // Optional
  damageDone: number;
  finalBlow: boolean;
}

export interface IKillmailVictim {
  id?: number;
  shipId?: number;
  damageTaken: number;
  position: { x: number; y: number; z: number; };
}

export type TKillmailParticipant = IKillmailVictim | IKillmailAttacker;

export interface IAllianceStatistics {
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

export interface ICorporationStatistics {
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

export interface ICharacterStatistics {
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
