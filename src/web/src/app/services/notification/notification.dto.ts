import { NOTIFICATION_TYPE } from './notification.constant';
import { DPagination } from '../paggination.dto';
import { DCharacterShort } from '../character/character.dto';
import { DCorporationShort } from '../corporation/corporation.dto';
import { DAllianceShort } from '../alliance/alliance.dto';
import { DPost } from '../post/post.dto';

export class DNotification {
  id: string;
  createdAt: Date;
  seenAt: Date;

  type: NOTIFICATION_TYPE;

  post?: DPost;
  commentId?: string;

  senderCharacter?: DCharacterShort;
  senderCorporation?: DCorporationShort;
  senderAlliance?: DAllianceShort;
}

export class DNotificationList extends DPagination<DNotification> {
}
