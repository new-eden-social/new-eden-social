import { Injectable } from '@nestjs/common';
import * as WebSocket from 'ws';
import {
  IKillmailStream,
  IKillmailStreamAttacker,
  IKillmailStreamRaw,
  IKillmailStreamVictim,
} from './killmailsStream.interface';


@Injectable()
export class KillmailsStreamService {

  private baseUrl = 'wss://api.pizza.moe/stream/killmails/';
  private userAgent = `eve-book/${process.env.npm_package_version} https://github.com/evebook/api`;
  private client: WebSocket;

  constructor() {
    this.client = new WebSocket(this.baseUrl, null, {
      headers: {
        'User-Agent': this.userAgent,
      },
    });
  }

  /**
   * Emmit formatted/standardised killmail
   * @param callback
   */
  public subscribe(callback: (data: IKillmailStream) => void) {
    this.client.on('message', (data: WebSocket.Data) => {
      const rawKillmail = <IKillmailStreamRaw> JSON.parse(data.toString());
      callback(this.formatRawKillmail(rawKillmail));
    });
  }

  /**
   * Emmit raw killmail data
   * @param callback
   */
  public subscribeRaw(callback: (data: IKillmailStreamRaw) => void) {
    this.client.on('message', (data: WebSocket.Data) => {
      const rawKillmail = <IKillmailStreamRaw> JSON.parse(data.toString());
      callback(rawKillmail);
    });
  }

  /**
   * Format raw Killmail to standardized
   * @param {IKillmailStreamRaw} raw
   * @return {IKillmailStream}
   */
  private formatRawKillmail(raw: IKillmailStreamRaw): IKillmailStream {
    return <IKillmailStream>{
      id: raw.killmail.killmail_id,
      date: new Date(raw.killmail.killmail_time),
      warId: raw.killmail.war ? raw.killmail.war.id : null,
      locationId: raw.zkb.locationID,
      totalValue: raw.zkb.totalValue,
      points: raw.zkb.points,
      npc: !!raw.zkb.npc,
      attackers: <IKillmailStreamAttacker[]>raw.killmail.attackers.map(attackerRaw => ({
        id: attackerRaw.character_id,
        shipId: attackerRaw.ship_type_id,
        weaponId: attackerRaw.weapon_type_id,
        damageDone: attackerRaw.damage_done,
        finalBlow: !!attackerRaw.final_blow,
      })),
      victim: <IKillmailStreamVictim>{
        id: raw.killmail.victim.character_id,
        shipId: raw.killmail.victim.ship_type_id,
        // damageTaken: raw.killmail.victim.damageTaken,
        position: raw.killmail.victim.position,
      },
    };
  }

}
