import { IsIn, IsNumber, IsString } from 'class-validator';
import { ICharacterResponse } from '../../character/character.interface';

export const POST_TYPES = [
  'text',
  'location',
  // 'corporationChange'
  // 'allianceChange'
];

export class ICreatePostRequest {

  @IsString()
  content: string;

  @IsIn(POST_TYPES)
  type: string;

  @IsNumber()
  locationId: number;

}

export interface IPostResponse {
  id: string;
  content: string;
  type: string;

  character?: ICharacterResponse;
}
