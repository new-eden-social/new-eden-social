import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { DAlliance } from './alliance.dto';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { AllianceGrpcClient } from '@new-eden-social/services-alliance';

@ApiUseTags('alliances')
@Controller('alliances')
export class AllianceHttpController {

  constructor(
    private readonly allianceClient: AllianceGrpcClient,
  ) {
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: DAlliance,
    description: 'Get Alliance by id',
  })
  @Get('/:allianceId')
  public async search(
    @Param('allianceId') allianceId: number,
  ): Promise<DAlliance> {
    const alliance = await this.allianceClient.service.get({
      allianceId,
    }).toPromise();
    return new DAlliance(alliance);
  }

}
