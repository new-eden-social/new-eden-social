import { ApiUseTags, ApiResponse } from "@nestjs/swagger";
import { Controller, HttpStatus, Param, Get } from "@nestjs/common";
import { DUrlMeta, DUrlMetaKillmail, DUrlMetaWebsite } from "./metascraper.dto";
import { MetascraperService } from "./metascraper.service";
import { IURLMetadata } from "./metascraper.interface";

@ApiUseTags('metascraper')
@Controller('metascraper')
export class MetascraperController {

  constructor(
    private metascraperService: MetascraperService,
  ) {
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: DUrlMeta,
    description: 'Get meta data for url',
  })
  @Get('process/:url')
  public async processUrl(
    @Param('url') url: string,
  ): Promise<DUrlMeta> {
    const metadata = await this.metascraperService.processUrl(url);
    return this.getProperUrlMeta(metadata);
  }

  private async getProperUrlMeta(metadata: IURLMetadata) {

    // Some secifics for certain publishers
    switch(metadata.publisher) {
      case 'zkillboard.com':
        // Zkill link that is killmail, we transform to killmail url
        if (metadata.title.endsWith('Killmail')) {
          const killmail = await this.metascraperService.processKillmail(metadata.url);
          return new DUrlMetaKillmail(metadata, killmail);
        }
    }

    return new DUrlMetaWebsite(metadata);
  }

}
