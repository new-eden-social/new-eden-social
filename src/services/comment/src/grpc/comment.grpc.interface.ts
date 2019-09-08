import { Observable } from 'rxjs';
import { ICreateComment } from '../comment.interface';

// Should reflect the .proto file!
export interface ICommentGrpcService {
  getLatest(data: IGetLatestRequest): Observable<IPaginatedCommentsResponse>;

  createAsCharacter(data: ICreateAsCharacterRequest): Observable<ICommentResponse>;
  createAsCorporation(data: ICreateAsCorporationRequest): Observable<ICommentResponse>;
  createAsAlliance(data: ICreateAsAllianceRequest): Observable<ICommentResponse>;

  getParticipantsForPost(data: IGetParticipantsReqiest): Observable<IGetParticipantsResponse>;
}

export interface IGetParticipantsReqiest {
  postId: string;
}

export interface IGetParticipantsResponse {
  characterIds: number[];
  corporationIds: number[];
  allianceIds: number[];
}

export interface ICreateAsCharacterRequest {
  comment: ICreateComment;
  postId: string;
  characterId: number;
}

export interface ICreateAsCorporationRequest {
  comment: ICreateComment;
  postId: string;
  corporationId: number;
}

export interface ICreateAsAllianceRequest {
  comment: ICreateComment;
  postId: string;
  allianceId: number;
}

export interface IPaginationRequest {
  limit: number;
  page: number;
}

export interface IGetLatestRequest {
  pagination: IPaginationRequest;
  postId: string;
}

export interface ICommentResponse {
  id: string;
  content: string;
  postId: string;
  characterId: number;
  corporationId: number;
  allianceId: number;
  createdAt: string;
}

export interface IPaginatedCommentsResponse {
  comments: ICommentResponse[];
  count: number;
}
