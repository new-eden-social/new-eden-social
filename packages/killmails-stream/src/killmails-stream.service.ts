import { Injectable } from '@nestjs/common';
import * as WebSocket from 'ws';
import { IKillmailStreamRaw } from './killmails-stream.interface';
import { ZKillboardService, IKillmail } from '@new-eden-social/zkillboard';

@Injectable()
export class KillmailsStreamService {

  private baseUrl = 'wss://api.pizza.moe/stream/killmails/';
  private userAgent = `@new-eden-social/killmails-stream:${process.env.npm_package_version} https://github.com/new-eden-social/new-eden-social`;
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
