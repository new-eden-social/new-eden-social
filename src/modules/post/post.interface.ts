import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { ICharacterResponse } from '../character/character.interface';
import { CREATABLE_TYPES } from './post.constants';

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

}

export interface IPostResponse {
  id: string;
  content: string;
  type: string;

  character?: ICharacterResponse;
}
