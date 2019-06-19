import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  IKillmailRaw,
  IKillmail,
  IKillmailVictim,
  IKillmailAttacker,
  IKillmailRawWithoutZKB,
  IAllianceStatistics,
  ICorporationStatistics,
  ICharacterStatistics,
} from './zkillboard.interface';
import {fromPromise} from 'rxjs/internal-compatibility';
import { retry, map } from 'rxjs/internal/operators';

@Injectable()
export class ZKillboardService {

  private baseUrl = `${process.env.ZKILLBOARD_ENDPOINT}/api/`;
  private userAgent = `eve-book/${process.env.npm_package_version} https://github.com/evebook/api`;
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: { 'User-Agent': this.userAgent, 'Accept-Encoding': 'gzip' },
    });
  }

  /**
   * Create Kill URL
   * @param {number} killId
   * @return {string}
   */
  public static createKillUrl(killId: number): string {
    return `https://zkillboard.com/kill/${killId}`;
  }

  public formatKillmail(raw: IKillmailRaw|IKillmailRawWithoutZKB, zkb: IKillmailRaw['zkb']): IKillmail {
    return <IKillmail>{
      id: raw.killmail_id,
      date: new Date(raw.killmail_time),
      warId: raw.war ? raw.war.id : null,
      locationId: zkb.locationID,
      totalValue: zkb.totalValue,
      points: zkb.points,
      npc: !!zkb.npc,
      attackers: <IKillmailAttacker[]>raw.attackers.map(attackerRaw => ({
        id: attackerRaw.character_id,
        shipId: attackerRaw.ship_type_id,
        weaponId: attackerRaw.weapon_type_id,
        damageDone: attackerRaw.damage_done,
        finalBlow: !!attackerRaw.final_blow,
      })),
      victim: <IKillmailVictim>{
        id: raw.victim.character_id,
        shipId: raw.victim.ship_type_id,
        // damageTaken: raw.victim.damageTaken,
        position: raw.victim.position,
      },
    };
  }

  public async getKillmail(id: number) {
    const killmails = await this.request<IKillmailRaw[]>({
      url: `killID/${id}/`,
      method: 'GET',
    })
    const killmail = killmails[0];
    return this.formatKillmail(killmail, killmail.zkb);
  }


  /**
   * Get alliance statistics from zKillboard
   *
   * @param id
   * @return {Promise<ICorporationStatistics>}
   */
  public async allianceStatistics(id: number): Promise<IAllianceStatistics> {
    return this.request<IAllianceStatistics>({
      url: `stats/allianceID/${id}/`,
      method: 'GET',
    });
  }

  /**
   * Get corporation statistics from zKillboard
   *
   * @param id
   * @return {Promise<ICorporationStatistics>}
   */
  public async corporationStatistics(id: number): Promise<ICorporationStatistics> {
    return this.request<ICorporationStatistics>({
      url: `stats/corporationID/${id}/`,
      method: 'GET',
    });
  }

  /**
   * Get character statistics from zKillboard
   *
   * @param id
   * @return {Promise<ICharacterStatistics>}
   */
  public async characterStatistics(id: number): Promise<ICharacterStatistics> {
    return this.request<ICharacterStatistics>({
      url: `stats/characterID/${id}/`,
      method: 'GET',
    });
  }

  /**
   * Request wrapper
   * @param config
   * @return {Promise<T>}
   */
  private request<T>(config: AxiosRequestConfig): Promise<T> {
    return fromPromise(this.client.request(config))
    .pipe(
      retry(3),
      map(response => response.data),
    ).toPromise();
  }
}
