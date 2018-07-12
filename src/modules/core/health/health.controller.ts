import {
  Controller,
  Get,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('health')
@Controller('health')
export class HealthController {

  @ApiResponse({
    status: HttpStatus.OK,
    type: String,
    description: 'API Health check',
  })
  @Get('')
  public async health() {
    return 'Healthy!';
  }

}
