import { IsOptional, IsString, IsUrl, Length, MaxLength } from 'class-validator';
import { ICharacterResponse } from '../character/character.interface';

/**
 * Validator used when creating Post
 */
export class ICreatePostRequest {

  @IsString()
  content: string;

  @IsOptional()
  @IsUrl()
  previewUrl?: string;

  @IsOptional()
  @IsUrl()
  previewImage?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  previewTitle?: string;

  @IsOptional()
  @IsString()
  previewDescription?: string;
}

export interface IPostResponse {
  id: string,
  content: string,
  previewUrl?: string,
  previewImage?: string,
  previewTitle?: string,
  previewDescription?: string,

  character?: ICharacterResponse,
}