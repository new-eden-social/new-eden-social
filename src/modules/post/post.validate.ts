import { POST_CREATABLE_TYPES, POST_TYPES } from './post.constants';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class ICreatePostRequest {

  @IsString()
  content: string;

  @IsIn(Object.keys(POST_CREATABLE_TYPES))
  type: POST_TYPES;

  @IsOptional()
  @IsNumber()
  locationId: number;

  @IsOptional()
  @IsNumber()
  corporationId: number;

  @IsOptional()
  @IsNumber()
  characterId: number;

  @IsOptional()
  @IsNumber()
  allianceId: number;
}
