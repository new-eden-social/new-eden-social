import {
  NOTIFICATION_TYPE, WS_NOTIFICATION_EVENT,
} from './notification.constants';
import { Notification } from './notification.entity';
import { WsResponse } from '@nestjs/websockets';
import { DPagination } from '../core/pagination/paggination.dto';

export class DNotification {
  id: string;
  createdAt: Date;
  seenAt: Date;

  type: NOTIFICATION_TYPE;

  postId?: string;
  commentId?: string;

  constructor(notification: Notification) {
    this.id = notification.id;
    this.createdAt = notification.createdAt;
    this.seenAt = notification.seenAt;
    this.type = notification.type;

    if (notification.post) this.postId = notification.post.id;
    if (notification.comment) this.commentId = notification.comment.id;
  }
}

export class DNotificationList extends DPagination<DNotification> {
  constructor(notifications: Notification[], page: number, perPage: number, count: number) {
    const formattedNotifications = notifications.map(item => new DNotification(item));
    super(formattedNotifications, page, perPage, count);
  }
}

export class DWsNotificationEvent implements WsResponse<DNotification> {
  event = WS_NOTIFICATION_EVENT;
  data: DNotification;

  constructor(notification: Notification) {
    this.data = new DNotification(notification);
  }
}
