import { Injectable } from '@nestjs/common';
import * as metascraper from 'metascraper';
import Axios, { AxiosInstance, AxiosPromise } from 'axios';
import { IURLMetadata } from './metascraper.interface';

@Injectable()
export class MetascraperService {

  constructor(
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

  /**
   * Processes URL using metascraper
   * Also checks if url is killmail, in that case it adds killmailId
   * @param url string
   */
  public async processUrl(url: string): Promise<IURLMetadata> {
    const response = await this.request(url);
    const metadata = (await this.metascraper({ url, html: response.data })) as IURLMetadata;
    if (this.isUrlmetaForKillmail(metadata)) {
      metadata.killmailId = this.getKillmailIdFromUrl(metadata.url);
    }
    return metadata;
  }

  private isUrlmetaForKillmail(metadata: IURLMetadata): boolean {
    return metadata.publisher === 'zkillboard.com' && metadata.url.includes('./kill/');
  }

  private getKillmailIdFromUrl(url: string): number {
    return +url.match(/kill\/\d+\//)[0].replace('kill', '').replace(/\//g, '');
  }

  private request(url): AxiosPromise<string> {
    return this.client.get<string>(url);
  }

}
