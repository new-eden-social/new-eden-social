import { POST_TYPES } from '@new-eden-social/services-post/post.constants';

export interface ICreatePost {
  content: string;
  type: POST_TYPES;
  locationId: number;
  corporationId: number;
  characterId: number;
  allianceId: number;
  url: string;
}
