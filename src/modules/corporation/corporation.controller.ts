import { Controller, Get, HttpStatus, Param, Response } from '@nestjs/common';
import { CorporationService } from './corporation.service';

@Controller('corporations')
export class CorporationController {

  constructor(private characterService: CorporationService) {
  }

  @Get('/:corporationId')
  public async search(@Response() res, @Param('corporationId') corporationId: number) {
    const corporation = await this.characterService.get(corporationId);

    res.status(HttpStatus.OK).json(corporation.response);
  }

}
