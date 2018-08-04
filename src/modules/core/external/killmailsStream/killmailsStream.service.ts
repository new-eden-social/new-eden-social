import { Injectable } from '@nestjs/common';
import * as WebSocket from 'ws';
import { IKillmail } from '../zkillboard/zkillboard.interface';
import { IKillmailStreamRaw } from './killmailsStream.interface';
import { ZKillboardService } from '../zkillboard/zkillboard.service';

@Injectable()
export class KillmailsStreamService {

  private baseUrl = 'wss://api.pizza.moe/stream/killmails/';
  private userAgent = `eve-book/${process.env.npm_package_version} https://github.com/evebook/api`;
  private client: WebSocket;

  constructor(
    private zkillboardService: ZKillboardService,
  ) {
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
  public subscribe(callback: (data: IKillmail) => void) {
    this.client.on('message', (data: WebSocket.Data) => {
      const rawKillmail = <IKillmailStreamRaw> JSON.parse(data.toString());
      callback(this.zkillboardService.formatKillmail(rawKillmail.killmail, rawKillmail.zkb));
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
}
