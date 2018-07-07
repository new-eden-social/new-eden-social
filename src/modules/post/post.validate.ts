import { POST_CREATABLE_TYPES, POST_TYPES } from './post.constants';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class VCreatePost {

  @IsString()
  @ApiModelProperty()
  content: string;

  @IsIn(Object.keys(POST_CREATABLE_TYPES))
  @ApiModelProperty()
  type: POST_TYPES;

  @IsOptional()
  @IsNumber()
  @ApiModelProperty()
  locationId: number;

  @IsOptional()
  @IsNumber()
  @ApiModelProperty()
  corporationId: number;

  @IsOptional()
  @IsNumber()
  @ApiModelProperty()
  characterId: number;

  @IsOptional()
  @IsNumber()
  @ApiModelProperty()
  allianceId: number;
}
