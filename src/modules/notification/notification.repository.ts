import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { Notification } from './notification.entity';

@EntityRepository(Notification)
export class NotificationRepository extends Repository<Notification> {
}
