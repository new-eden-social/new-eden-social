import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable, from } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { Notification } from '../notification.entity';
import { INotificationGrpcService, ICreateRequest, INotificationResponse, IGetLatestRequest, IPaginatedNotificationResponse, IMarkAsSeenRequest } from './notification.grpc.interface';
import { NotificationService } from '../notification.service';

@Controller()
export class NotificationGrpcController implements INotificationGrpcService {

  constructor(
    private readonly notificationService: NotificationService,
    ) {
  }

  @GrpcMethod('NotificationService')
  create(data: ICreateRequest): Observable<INotificationResponse> {
    return from(this.notificationService.create(
      data.eventUuid,
      data.type,
      data.recipientId,
      data.senderCharacterId,
      data.senderCorporationId,
      data.senderAllianceId,
      data.postId,
      data.commentId,
    )).pipe<INotificationResponse>(
      map<Notification, INotificationResponse>(this.notificationTransform)
    );
  }

  @GrpcMethod('NotificationService')
  getLatest(data: IGetLatestRequest): Observable<IPaginatedNotificationResponse> {
    return from(this.notificationService.getLatest(
      data.characterId,
      data.pagination.limit,
      data.pagination.page
    )).pipe<IPaginatedNotificationResponse>(
      map<{ notifications: Notification[], count: number }, IPaginatedNotificationResponse>(notificationData => ({
        notifications: notificationData.notifications.map(this.notificationTransform),
        count: notificationData.count,
      }))
    );
  }

  @GrpcMethod('NotificationService')
  markAsSeen(data: IMarkAsSeenRequest): Observable<INotificationResponse> {
    return from(this.notificationService.get(
      data.notificationId,
      data.characterId,
    )).pipe<Notification, INotificationResponse>(
      flatMap(notification => this.notificationService.markAsSeen(notification)),
      map<Notification, INotificationResponse>(this.notificationTransform)
    );
  }

  private notificationTransform(notification: Notification): INotificationResponse {
    return {
      id: notification.id,
      createdAt: notification.createdAt.toISOString(),
      seenAt: notification.seenAt.toISOString(),
      type: notification.type,
      recipientId: notification.recipientId,
      senderCharacterId: notification.senderCharacterId,
      senderCorporationId: notification.senderCorporationId,
      senderAllianceId: notification.senderAllianceId,
      postId: notification.postId,
      commentId: notification.commentId,
    };
  }
}
