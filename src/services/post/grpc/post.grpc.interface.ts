import { Observable } from 'rxjs';
import { ICreatePost } from '@new-eden-social/services-post/post.interface';
import { POST_TYPES } from '@new-eden-social/services-post/post.constants';

// Should reflect the .proto file!
export interface IPostGrpcService {
  get(data: IGetRequest): Observable<IPostResponse>;

  createAsCharacter(data: ICreateAsCharacterRequest): Observable<IPostResponse>;
  createAsCorporation(data: ICreateAsCorporationRequest): Observable<IPostResponse>;
  createAsAlliance(data: ICreateAsAllianceRequest): Observable<IPostResponse>;

  getCharacterWall(data: IGetCharacterWallRequest): Observable<IPaginatedPostResponse>;
  getCorporationWall(data: IGetCorporationWallRequest): Observable<IPaginatedPostResponse>;
  getAllianceWall(data: IGetAllianceWallRequest): Observable<IPaginatedPostResponse>;
  getHashtagWall(data: IGetHashtagWallRequest): Observable<IPaginatedPostResponse>;
  getLocationWall(data: IGetLocationWallRequest): Observable<IPaginatedPostResponse>;
  getLatestWall(data: IGetLatestWallRequest): Observable<IPaginatedPostResponse>;
}

export interface IGetRequest {
  postId: string;
}

export interface ICreateAsCharacterRequest {
  post: ICreatePost;
  characterId: number;
}

export interface ICreateAsCorporationRequest {
  post: ICreatePost;
  corporationId: number;
}

export interface ICreateAsAllianceRequest {
  post: ICreatePost;
  allianceId: number;
}

export interface IPaginationRequest {
  limit: number;
  page: number;
}

export interface IGetCharacterWallRequest {
  pagination: IPaginationRequest;
  characterId: number;
}

export interface IGetCorporationWallRequest {
  pagination: IPaginationRequest;
  corporationId: number;
}

export interface IGetAllianceWallRequest {
  pagination: IPaginationRequest;
  allianceId: number;
}

export interface IGetHashtagWallRequest {
  pagination: IPaginationRequest;
  hashtag: string;
}

export interface IGetLocationWallRequest {
  pagination: IPaginationRequest;
  locationId: number;
}

export interface IGetLatestWallRequest {
  pagination: IPaginationRequest;
}

export interface IUrlResponse {
    author?: string;
    date?: string;
    description?: string;
    image?: string;
    video?: string;
    lang?: string;
    logo: string;
    publisher: string;
    title: string;
    url: string;
    killmailId?: number;
}

export interface IPostResponse {
  id: string;
  content: string;
  type: POST_TYPES;
  killmailId: number;
  url: IUrlResponse;
  createdAt: string;
  locationId: number;
  characterId: number;
  corporationId: number;
  allianceId: number;
  characterWallId: number;
  corporationWallId: number;
  allianceWallId: number;
  hashtags: string[];
}

export interface IPaginatedPostResponse {
  posts: IPostResponse[];
  count: number;
}
