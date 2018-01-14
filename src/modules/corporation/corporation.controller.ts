import { Controller, Get, HttpStatus, Param, Response } from '@nestjs/common';
import { CorporationService } from './corporation.service';
import { DCorporation } from './corporation.dto';

@Controller('corporations')
export class CorporationController {

  constructor(private characterService: CorporationService) {
  }

  @Get('/:corporationId')
  public async search(@Response() res, @Param('corporationId') corporationId: number) {
    const corporation = await this.characterService.get(corporationId);

    const response = new DCorporation(corporation);

    res.status(HttpStatus.OK).json(response);
  }

}
