import { Injectable } from '@nestjs/common';
import * as metascraper from 'metascraper';
import Axios, { AxiosInstance, AxiosPromise } from 'axios';
import { IURLMetadata } from './metascraper.interface';
import { Killmail } from '../killmail/killmail.entity';
import { KillmailService } from '../killmail/killmail.service';

@Injectable()
export class MetascraperService {

  constructor(
    private readonly killmailService: KillmailService,
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

    this.client = Axios.create({
      headers: {
        'User-Agent': MetascraperService.userAgent,
      },
    });
  }

  private static readonly userAgent = `eve-book/${process.env.npm_package_version}`
  + ' https://github.com/evebook/api';

  private readonly metascraper;
  private readonly client: AxiosInstance;

  async processUrl(url: string): Promise<IURLMetadata> {
    const response = await this.request(url);
    return (await this.metascraper({ url, html: response.data })) as IURLMetadata;
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
