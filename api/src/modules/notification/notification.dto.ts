import {
  NOTIFICATION_TYPE,
  WS_NOTIFICATION_EVENT,
  WS_NOTIFICATION_SEEN_EVENT,
} from './notification.constants';
import { Notification } from './notification.entity';
import { WsResponse } from '@nestjs/websockets';
import { DPagination } from '../core/pagination/paggination.dto';
import { DCharacterShort } from '../character/character.dto';
import { DCorporationShort } from '../corporation/corporation.dto';
import { DAllianceShort } from '../alliance/alliance.dto';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { DPost } from '../post/post.dto';

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
  post?: DPost;
  @ApiModelPropertyOptional()
  commentId?: string;

  @ApiModelPropertyOptional()
  senderCharacter?: DCharacterShort;
  @ApiModelPropertyOptional()
  senderCorporation?: DCorporationShort;
  @ApiModelPropertyOptional()
  senderAlliance?: DAllianceShort;

  constructor(notification: Notification) {
    this.id = notification.id;
    this.createdAt = notification.createdAt;
    this.seenAt = notification.seenAt;
    this.type = notification.type;

    if (notification.senderCharacter) {
      this.senderCharacter = new DCharacterShort(notification.senderCharacter);
    }
    if (notification.senderCorporation) {
      this.senderCorporation = new DCorporationShort(notification.senderCorporation);
    }
    if (notification.senderAlliance) {
      this.senderAlliance = new DAllianceShort(notification.senderAlliance);
    }

    if (notification.post) this.post = new DPost(notification.post);
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

export class DWsNotificationSeenEvent implements WsResponse<DNotification> {
  event = WS_NOTIFICATION_SEEN_EVENT;
  data: DNotification;

  constructor(notification: Notification) {
    this.data = new DNotification(notification);
  }
}
