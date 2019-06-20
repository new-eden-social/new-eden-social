import { Injectable } from '@nestjs/common';
import * as metascraper from 'metascraper';
import axios, { AxiosInstance, AxiosPromise } from 'axios';
import { IURLMetadata } from './metascraper.interface';
import { Killmail } from '../killmail/killmail.entity';
import { KillmailService } from '../killmail/killmail.service';

@Injectable()
export class MetascraperService {

  private metascraper;
  private client: AxiosInstance;

  private static userAgent = `eve-book/${process.env.npm_package_version}`
  + ' https://github.com/evebook/api';

  constructor(
    private killmailService: KillmailService,
  ) {
    this.metascraper = metascraper([
      require('metascraper-author')(),
      require('metascraper-date')(),
      require('metascraper-description')(),
      require('metascraper-image')(),
      require('metascraper-video')(),
      require('metascraper-logo')(),
      require('metascraper-publisher')(),
      require('metascraper-title')(),
      require('metascraper-url')(),
      require('metascraper-video-provider')(),
    ]);

    this.client = axios.create({
      headers: {
        'User-Agent': MetascraperService.userAgent,
      },
    });
  }

  async processUrl(url: string): Promise<IURLMetadata> {
    const response = await this.request(url);
    return <IURLMetadata>(await this.metascraper({ url, html: response.data }));
  }

  isUrlmetaForKillmail(metadata: IURLMetadata): boolean {
    return metadata.publisher === 'zkillboard.com' && metadata.url.includes('/kill/');
  }

  processKillmail(url: string): Promise<Killmail> {
    const id = +url.match(/kill\/\d+\//)[0].replace('kill', '').replace(/\//g, '');
    return this.killmailService.getById(id);
  }

  private request(url): AxiosPromise<string> {
    return this.client.get<string>(url);
  }

}
