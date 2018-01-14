export interface IKillmailStream {
  id: number;
  date: Date;
  warId: number;
  locationId: number;
  totalValue: number;
  points: number;
  npc: boolean;
  attackers: IKillmailStreamAttacker[];
  victim: IKillmailStreamVictim;
}

export interface IKillmailStreamAttacker {
  id?: number; // NPC's don't have ids
  shipId?: number;
  weaponId?: number; // Optional
  damageDone: number;
  finalBlow: boolean;
}

export interface IKillmailStreamVictim {
  id?: number;
  shipId?: number;
  damageTaken: number;
  position: { x: number; y: number; z: number; };
}

export type TKillmailStreamParticipant = IKillmailStreamVictim | IKillmailStreamAttacker;

export interface IKillmailStreamRaw {
  readonly killID: number;
  readonly killmail: {
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
  };
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

