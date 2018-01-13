import { CREATABLE_TYPES } from './post.constants';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class ICreatePostRequest {

  @IsString()
  content: string;

  @IsIn(Object.keys(CREATABLE_TYPES))
  type: string;

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
