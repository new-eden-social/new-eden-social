import { Injectable } from '@nestjs/common';
import * as WebSocket from 'ws';
import { IKillmailStreamRaw } from './killmails-stream.interface';
import { ZKillboardService, IKillmail } from '@new-eden-social/zkillboard';

@Injectable()
export class KillmailsStreamService {

  private readonly baseUrl = 'wss://api.pizza.moe/stream/killmails/';
  private readonly userAgent = `@new-eden-social/killmails-stream:${process.env.npm_package_version} https://github.com/new-eden-social/new-eden-social`;
  private readonly client: WebSocket;

  constructor(
    private readonly zkillboardService: ZKillboardService,
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
      const rawKillmail = JSON.parse(data.toString()) as IKillmailStreamRaw;
      callback(this.zkillboardService.formatKillmail(rawKillmail.killmail, rawKillmail.zkb));
    });
  }

  /**
   * Emmit raw killmail data
   * @param callback
   */
  public subscribeRaw(callback: (data: IKillmailStreamRaw) => void) {
    this.client.on('message', (data: WebSocket.Data) => {
      const rawKillmail = JSON.parse(data.toString()) as IKillmailStreamRaw;
      callback(rawKillmail);
    });
  }
}
