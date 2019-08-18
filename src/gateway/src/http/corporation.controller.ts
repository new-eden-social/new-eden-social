import { Controller, Get, HttpStatus, Param, Response } from '@nestjs/common';
import { CorporationService } from '../corporation.service';
import { DCorporation } from './corporation.dto';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('corporations')
@Controller('corporations')
export class CorporationHttpController {

  constructor(
    private readonly corporationService: CorporationService,
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
    const corporation = await this.corporationService.get(corporationId);
    return new DCorporation(corporation);
  }

}
