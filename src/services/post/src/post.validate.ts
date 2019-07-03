import { POST_CREATABLE_TYPES, POST_TYPES } from './post.constants';
import { IsIn, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class VCreatePost {

  @IsString()
  @ApiModelProperty()
  content: string;

  @IsIn(Object.keys(POST_CREATABLE_TYPES))
  @ApiModelProperty()
  type: POST_TYPES;

  @IsOptional()
  @IsNumber()
  @ApiModelPropertyOptional()
  locationId: number;

  @IsOptional()
  @IsNumber()
  @ApiModelPropertyOptional()
  corporationId: number;

  @IsOptional()
  @IsNumber()
  @ApiModelPropertyOptional()
  characterId: number;

  @IsOptional()
  @IsNumber()
  @ApiModelPropertyOptional()
  allianceId: number;

  @IsOptional()
  @IsUrl()
  @ApiModelPropertyOptional()
  url: string;
}
