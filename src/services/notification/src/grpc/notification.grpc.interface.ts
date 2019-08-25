import { NOTIFICATION_TYPE } from '../notification.constants';
import { Observable } from 'rxjs';

// Should reflect the .proto file!
export interface INotificationGrpcService {
  create(data: ICreateRequest): Observable<INotificationEntity>;
}

export interface INotificationEntity {
  id: string;
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
