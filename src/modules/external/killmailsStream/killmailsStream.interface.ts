declare module KillmailsStream {

  interface IKillmail {
    id: number;
    date: Date;
    warId: number;
    locationId: number;
    totalValue: number;
    fittedValue: number;
    points: number;
    npc: boolean;
    attackers: Array<{
      id?: number; // NPC's don't have ids
      shipId: number;
      weaponId?: number; // Optional
      damageDone: number;
      finalBlow: boolean;
    }>;
    victim: {
      id: number;
      shipId: number;
      damageTaken: number;
      position: { x: number; y: number; z: number; }
    }
  }

  interface IKillmailStreamRaw {
    readonly killID: number;
    readonly killmail: {
      readonly killID: number;
      readonly killTime: string;
      readonly attackers: Array<{
        readonly alliance: {
          readonly id: number;
          readonly href: string;
          readonly name: string;
          readonly icon: {
            readonly href: string;
          };
        };
        readonly corporation: {
          readonly id: number;
          readonly href: string;
          readonly name: string;
          readonly icon: {
            readonly href: string;
          };
        };
        readonly character: {
          readonly id: number;
          readonly href: string;
          readonly name: string;
          readonly icon: {
            readonly href: string;
          };
        };
        readonly shipType: {
          readonly id: number;
          readonly href: string;
          readonly name: string;
          readonly icon: {
            readonly href: string;
          };
        };
        readonly weaponType: {
          readonly id: number;
          readonly href: string;
          readonly name: string;
          readonly icon: {
            readonly href: string;
          };
        };
        readonly damageDone: number;
        readonly securityStatus: number;
        readonly finalBlow: boolean;
      }>;
      readonly attackersCount: number;
      readonly victim: {
        readonly damageTaken: number;
        readonly alliance: {
          readonly id: number;
          readonly href: string;
          readonly name: string;
          readonly icon: {
            readonly href: string;
          };
        };
        readonly corporation: {
          readonly id: number;
          readonly href: string;
          readonly name: string;
          readonly icon: {
            readonly href: string;
          };
        };
        readonly character: {
          readonly id: number;
          readonly href: string;
          readonly name: string;
          readonly icon: {
            readonly href: string;
          };
        };
        readonly shipType: {
          readonly id: number;
          readonly href: string;
          readonly name: string;
          readonly icon: {
            readonly href: string;
          };
        };
        readonly position: {
          readonly x: number;
          readonly y: number;
          readonly z: number;
        }
        readonly items: Array<{
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
        }>
      };
      readonly war: {
        readonly id: number;
        readonly href: string;
      }
    }
    readonly zkb: {
      readonly hash: string;
      readonly locationId: number;
      readonly fittedValue: number;
      readonly totalValue: number;
      readonly points: number;
      readonly npc: boolean;
      readonly href: string;
    }

  }
}

export = KillmailsStream;
