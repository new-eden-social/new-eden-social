import { Controller, Get, HttpStatus, Param, Response } from '@nestjs/common';
import { AllianceService } from './alliance.service';
import { DAlliance } from './alliance.dto';

@Controller('alliances')
export class AllianceController {

  constructor(private allianceService: AllianceService) {
  }

  @Get('/:allianceId')
  public async search(@Response() res, @Param('allianceId') allianceId: number) {
    const alliance = await this.allianceService.get(allianceId);

    const response = new DAlliance(alliance);

    res.status(HttpStatus.OK).json(response);
  }

}
