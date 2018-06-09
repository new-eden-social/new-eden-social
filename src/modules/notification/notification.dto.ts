import {
  NOTIFICATION_TYPE, WS_NOTIFICATION_NEW_POST_ON_YOUR_WALL,
} from './notification.constants';
import { Notification } from './notification.entity';
import { WsResponse } from '@nestjs/websockets';

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

export class DWsNotificationForNewPost implements WsResponse<DNotification> {
  event: string = WS_NOTIFICATION_NEW_POST_ON_YOUR_WALL;
  data: DNotification;

  constructor(notification: Notification) {
    this.data = new DNotification(notification);
  }
}
