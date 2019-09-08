import { NOTIFICATION_TYPE } from '../notification.constants';
import { Observable } from 'rxjs';

// Should reflect the .proto file!
export interface INotificationGrpcService {
  getLatest(data: IGetLatestRequest): Observable<IPaginatedNotificationResponse>;
  create(data: ICreateRequest): Observable<INotificationResponse>;
  markAsSeen(data: IMarkAsSeenRequest): Observable<INotificationResponse>;
}

export interface IMarkAsSeenRequest {
  notificationId: string;
  characterId: number;
}

export interface IPaginatedNotificationResponse {
  notifications: INotificationResponse[];
  count: number;
}

export interface IGetLatestRequest {
  pagination: IPaginationRequest;
  characterId: number;
}

export interface IPaginationRequest {
  limit: number;
  page: number;
}

export interface INotificationResponse {
  id: string;
  createdAt: string;
  seenAt: string;
  type: NOTIFICATION_TYPE;
  recipientId: number;
  senderCharacterId: number;
  senderCorporationId: number;
  senderAllianceId: number;
  postId: string;
  commentId: string;
}

export interface ICreateRequest {
  eventUuid: string;
  type: NOTIFICATION_TYPE;
  recipientId: number;
  senderCharacterId?: number;
  senderCorporationId?: number;
  senderAllianceId?: number;
  postId?: string;
  commentId?: string;
}
