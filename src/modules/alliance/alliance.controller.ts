import { Controller, Get, HttpStatus, Param, Response } from '@nestjs/common';
import { AllianceService } from './alliance.service';

@Controller('alliances')
export class AllianceController {

  constructor(private allianceService: AllianceService) {
  }

  @Get('/:allianceId')
  public async search(@Response() res, @Param('characterId') allianceId: number) {
    const alliance = await this.allianceService.get(allianceId);

    res.status(HttpStatus.OK).json(alliance.response);
  }

}
