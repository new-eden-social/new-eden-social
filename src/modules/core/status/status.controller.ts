import {
  Controller,
  Get,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('status')
@Controller('status')
export class StatusController {

  @ApiResponse({
    status: HttpStatus.OK,
    type: { status: 'OK' },
    description: 'API Status check',
  })
  @Get()
  public async status() {
    return {
      status: 'OK',
    };
  }

}
