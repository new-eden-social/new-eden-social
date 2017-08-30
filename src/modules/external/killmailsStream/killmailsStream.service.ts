import { Component } from '@nestjs/common';
import * as WebSocket from 'ws';
import { IKillmail, IKillmailStreamRaw } from './killmailsStream.interface';


@Component()
export class KillmailsStreamService {

  private baseUrl = 'wss://api.pizza.moe/stream/killmails/';
  private userAgent = `eve-book/${process.env.npm_package_version} https://github.com/evebook/api`;
  private client: WebSocket;

  constructor() {
    this.client = new WebSocket(this.baseUrl, null, {
      headers: {
        'User-Agent': this.userAgent,
      },
    })
  }

  /**
   * Emmit formatted/standardised killmail
   * @param callback
   */
  public subscribe(callback: (data: IKillmail) => void) {
    this.client.on('message', (data: WebSocket.Data) => {
      const rawKillmail = <IKillmailStreamRaw> JSON.parse(data.toString());
      callback(this.formatRawKillmail(rawKillmail))
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
   * @param {KillmailsStream.IKillmailStreamRaw} raw
   * @return {KillmailsStream.IKillmail}
   */
  private formatRawKillmail(raw: IKillmailStreamRaw): IKillmail {
    return <IKillmail>{
      id: raw.killID,
      date: new Date(raw.killmail.killTime),
      warId: raw.killmail.war.id,
      locationId: raw.zkb.locationId,
      totalValue: raw.zkb.totalValue,
      fittedValue: raw.zkb.fittedValue,
      points: raw.zkb.points,
      npc: raw.zkb.npc,
      attackers: raw.killmail.attackers.map(attackerRaw => ({
        id: attackerRaw.character ? attackerRaw.character.id : null,
        shipId: attackerRaw.shipType.id,
        weaponId: attackerRaw.weaponType ? attackerRaw.weaponType.id : null,
        damageDone: attackerRaw.damageDone,
        finalBlow: attackerRaw.finalBlow,
      })),
      victim: {
        id: raw.killmail.victim.character.id,
        shipId: raw.killmail.victim.shipType.id,
        damageTaken: raw.killmail.victim.damageTaken,
        position: raw.killmail.victim.position,
      },
    }
  }

}
