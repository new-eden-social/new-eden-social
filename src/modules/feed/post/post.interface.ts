import { IsIn, IsNumber, IsString } from 'class-validator';
import { ICharacterResponse } from '../../character/character.interface';

export const PostTypes = [
  'text',
  'location',
  //'corporationChange'
  //'allianceChange'
];

export class ICreatePostRequest {

  @IsString()
  content: string;

  @IsIn(PostTypes)
  type: string;

  @IsNumber()
  locationId: number;

}

export interface IPostResponse {
  id: string,
  content: string,
  type: string,

  character?: ICharacterResponse,
}