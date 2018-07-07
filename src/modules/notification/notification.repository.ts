import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { Notification } from './notification.entity';
import { Character } from '../character/character.entity';

@EntityRepository(Notification)
export class NotificationRepository extends Repository<Notification> {

  public async findOneForCharacter(
    notificationId: string,
    character: Character,
  ): Promise<Notification | undefined> {
    return this.createQueryBuilder('notification')
    .leftJoinAndSelect('notification.senderCharacter', 'senderCharacter')
    .leftJoinAndSelect('senderCharacter.corporation', 'senderCharacterCorporation')
    .leftJoinAndSelect('senderCharacterCorporation.alliance', 'senderCharacterAlliance')
    .leftJoinAndSelect('notification.senderCorporation', 'senderCorporation')
    .leftJoinAndSelect('senderCorporation.alliance', 'senderCorporationAlliance')
    .leftJoinAndSelect('notification.senderAlliance', 'senderAlliance')
    .where('notification."id" = :notificationId', { notificationId })
    .andWhere('notification."recipientId" = :characterId', { characterId: character.id })
    .getOne();
  }

  public async getLatestForCharacter(
    character: Character,
    limit: number,
    page: number,
  ): Promise<[Notification[], number]> {
    return this.createQueryBuilder('notification')
    .leftJoinAndSelect('notification.senderCharacter', 'senderCharacter')
    .leftJoinAndSelect('senderCharacter.corporation', 'senderCharacterCorporation')
    .leftJoinAndSelect('senderCharacterCorporation.alliance', 'senderCharacterAlliance')
    .leftJoinAndSelect('notification.senderCorporation', 'senderCorporation')
    .leftJoinAndSelect('senderCorporation.alliance', 'senderCorporationAlliance')
    .leftJoinAndSelect('notification.senderAlliance', 'senderAlliance')
    .where('notification."recipientId" = :characterId', { characterId: character.id })
    .orderBy({ 'notification."createdAt"': 'DESC' })
    .offset(limit * page)
    .limit(limit)
    .getManyAndCount();
  }

  public async markAsSeen(
    notification: Notification,
  ): Promise<void> {
    notification.seenAt = new Date();
    await this.save(notification);
  }
}
