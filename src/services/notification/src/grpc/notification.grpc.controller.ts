import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Notification } from '../notification.entity';
import { INotificationGrpcService, INotificationEntity, ICreateRequest } from './notification.grpc.interface';
import { NotificationService } from '../notification.service';

@Controller()
export class NotificationGrpcController implements INotificationGrpcService {

  constructor(
    private readonly notificationService: NotificationService,
    ) {
  }

  @GrpcMethod('NotificationService')
  create(data: ICreateRequest): Observable<INotificationEntity> {
    return from(this.notificationService.create(
      data.eventUuid,
      data.type,
      data.recipientId,
      data.senderCharacterId,
      data.senderCorporationId,
      data.senderAllianceId,
      data.postId,
      data.commentId,
    )).pipe<INotificationEntity>(
      map<Notification, INotificationEntity>(this.notificationTransform)
    );

  }

  private notificationTransform(notification: Notification): INotificationEntity {
    return {
      id: notification.id,
    };
  }
}
