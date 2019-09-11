import { DPagination } from '@new-eden-social/pagination';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { NOTIFICATION_TYPE, INotificationResponse } from '@new-eden-social/services-notification';

export class DNotification {
  @ApiModelProperty()
  id: string;
  @ApiModelProperty({ type: String })
  createdAt: Date;
  @ApiModelProperty({ type: String })
  seenAt: Date;

  @ApiModelProperty()
  type: NOTIFICATION_TYPE;

  @ApiModelPropertyOptional()
  postId?: string;
  @ApiModelPropertyOptional()
  commentId?: string;

  @ApiModelPropertyOptional()
  senderCharacterId?: number;
  @ApiModelPropertyOptional()
  senderCorporationId?: number;
  @ApiModelPropertyOptional()
  senderAllianceId?: number;

  constructor(notification: INotificationResponse) {
    this.id = notification.id;
    this.createdAt = new Date(notification.createdAt);
    this.seenAt = new Date(notification.seenAt);
    this.type = notification.type;
    this.postId = notification.postId;
    this.commentId = notification.commentId;
    this.senderCharacterId = notification.senderCharacterId;
    this.senderCorporationId = notification.senderCorporationId;
    this.senderAllianceId = notification.senderAllianceId;
  }
}

export class DNotificationList extends DPagination<DNotification> {
  constructor(notifications: INotificationResponse[], page: number, perPage: number, count: number) {
    const formattedNotifications = notifications.map(item => new DNotification(item));
    super(formattedNotifications, page, perPage, count);
  }
}
