import {
  Controller,
  Get,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { StatusService } from './status.service';
import { DStatus } from './status.dto';

@ApiUseTags('status')
@Controller('status')
export class StatusController {

  constructor(
    private statusService: StatusService,
  ) {
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: DStatus,
    description: 'API Status check',
  })
  @Get()
  public async status(): Promise<DStatus> {
    const status = await this.statusService.status();
    return new DStatus(status);
  }

}
