import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { Notification } from './notification.entity';

@EntityRepository(Notification)
export class NotificationRepository extends Repository<Notification> {

  public async findOneForCharacter(
    notificationId: string,
    characterId: number,
  ): Promise<Notification | undefined> {
    return this.createQueryBuilder('notification')
    .where('notification."id" = :notificationId', { notificationId })
    .andWhere('notification."recipientId" = :characterId', { characterId })
    .getOne();
  }

  public async getLatestForCharacter(
    characterId: number,
    limit: number,
    page: number,
  ): Promise<[Notification[], number]> {
    return this.createQueryBuilder('notification')
    .where('notification."recipientId" = :characterId', { characterId })
    .orderBy({ 'notification."createdAt"': 'DESC' })
    .offset(limit * page)
    .limit(limit)
    .getManyAndCount();
  }

  public async markAsSeen(
    notification: Notification,
  ): Promise<Notification> {
    notification.seenAt = new Date();
    return this.save(notification);
  }
}
