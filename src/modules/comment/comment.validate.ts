import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class VCreateComment {
  @IsString()
  @ApiModelProperty()
  content: string;
}
