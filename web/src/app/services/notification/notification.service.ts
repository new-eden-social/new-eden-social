import { Injectable } from '@angular/core';
import { NOTIFICATION_TYPE } from './notification.constant';
import { DNotification } from './notification.dto';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  getSenderName(notification: DNotification): string {
    if (notification.senderCharacter) return notification.senderCharacter.name;
    if (notification.senderCorporation) return notification.senderCorporation.name;
    if (notification.senderAlliance) return notification.senderAlliance.name;
  }

  getSenderImage(notification: DNotification): string {
    if (notification.senderCharacter) return notification.senderCharacter.portrait.px256x256;
    if (notification.senderCorporation) return notification.senderCorporation.icon.px256x256;
    if (notification.senderAlliance) return notification.senderAlliance.icon.px128x128;
  }

  getHTML(notification: DNotification): string {
    const name = this.getSenderName(notification);
    switch (notification.type) {
      case NOTIFICATION_TYPE.NEW_POST_ON_YOUR_WALL:
        return `<strong>${name}</strong> has posted on <strong>your wall</strong>.`;
      case NOTIFICATION_TYPE.NEW_POST_ON_YOUR_CORPORATION_WALL:
        return `<strong>${name}</strong> has posted on <strong>your corporation wall</strong>.`;
      case NOTIFICATION_TYPE.NEW_POST_ON_YOUR_ALLIANCE_WALL:
        return `<strong>${name}</strong> has posted on <strong>your alliance wall</strong>.`;
      case NOTIFICATION_TYPE.NEW_COMMENT_ON_YOUR_POST:
        return `<strong>${name}</strong> has commented on <strong>your post</strong>.`;
      case NOTIFICATION_TYPE.NEW_COMMENT_ON_A_POST_YOU_PARTICIPATE:
        return `<strong>${name}</strong> has commented on <strong>a post you participate</strong>.`;
      case NOTIFICATION_TYPE.NEW_FOLLOWER:
        return `<strong>${name}</strong> is now following you.`;
      default:
        return `Unknown notification type: ${notification.type}`;
    }
  }

  getText(notification: DNotification): string {
    const name = this.getSenderName(notification);
    switch (notification.type) {
      case NOTIFICATION_TYPE.NEW_POST_ON_YOUR_WALL:
        return `${name} has posted on your wall.`;
      case NOTIFICATION_TYPE.NEW_POST_ON_YOUR_CORPORATION_WALL:
        return `${name} has posted on your corporation wall.`;
      case NOTIFICATION_TYPE.NEW_POST_ON_YOUR_ALLIANCE_WALL:
        return `${name} has posted on your alliance wall.`;
      case NOTIFICATION_TYPE.NEW_COMMENT_ON_YOUR_POST:
        return `${name} has commented on your post.`;
      case NOTIFICATION_TYPE.NEW_COMMENT_ON_A_POST_YOU_PARTICIPATE:
        return `${name} has commented on a post you participate.`;
      case NOTIFICATION_TYPE.NEW_FOLLOWER:
        return `${name} is now following you.`;
      default:
        return `Unknown notification type: ${notification.type}`;
    }
  }
}
