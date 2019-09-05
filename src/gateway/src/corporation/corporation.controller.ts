import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { DCorporation } from './corporation.dto';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { CorporationGrpcClient } from '@new-eden-social/api-corporation';

@ApiUseTags('corporations')
@Controller('corporations')
export class CorporationHttpController {

  constructor(
    private readonly corporationClient: CorporationGrpcClient,
  ) {
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: DCorporation,
    description: 'Get Corporation by id',
  })
  @Get('/:corporationId')
  public async search(
    @Param('corporationId') corporationId: number,
  ): Promise<DCorporation> {
    const corporation = await this.corporationClient.service.get({
      corporationId,
    }).toPromise();
    return new DCorporation(corporation);
  }

}
