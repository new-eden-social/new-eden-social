import { NOTIFICATION_TYPE } from './notification.constants';
import { Notification } from './notification.entity';

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

    this.postId = notification.post.id;
    this.commentId = notification.comment.id;
  }
}
