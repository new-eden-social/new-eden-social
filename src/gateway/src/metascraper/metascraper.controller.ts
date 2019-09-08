import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { Controller, HttpStatus, Param, Get } from '@nestjs/common';
import { DUrlMeta, DUrlMetaKillmail, DUrlMetaWebsite } from './metascraper.dto';
import { MetascraperGrpcClient, IURLMetadata } from '@new-eden-social/api-metascraper';

@ApiUseTags('metascraper')
@Controller('metascraper')
export class MetascraperController {

  constructor(
    private readonly metascraperClient: MetascraperGrpcClient,
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
    const metadata = await this.metascraperClient.service.processUrl({ url }).toPromise();
    return this.getProperUrlMeta(metadata);
  }

  private async getProperUrlMeta(metadata: IURLMetadata) {
    if (metadata.killmailId) {
      return new DUrlMetaKillmail(metadata, metadata.killmailId);
    }

    return new DUrlMetaWebsite(metadata);
  }

}
