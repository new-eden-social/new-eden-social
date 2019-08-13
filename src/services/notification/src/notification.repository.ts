import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { Notification } from './notification.entity';
import { Character } from '@new-eden-social/api-character';

@EntityRepository(Notification)
export class NotificationRepository extends Repository<Notification> {

  public async findOneForCharacter(
    notificationId: string,
    character: Character,
  ): Promise<Notification | undefined> {
    return this.createQueryBuilder('notification')
    .leftJoinAndSelect('notification.recipient', 'recipient')
    .leftJoinAndSelect('recipient.corporation', 'recipientCorporation')
    .leftJoinAndSelect('recipientCorporation.alliance', 'recipientAlliance')
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
    .leftJoinAndSelect('notification.recipient', 'recipient')
    .leftJoinAndSelect('recipient.corporation', 'recipientCorporation')
    .leftJoinAndSelect('recipientCorporation.alliance', 'recipientAlliance')
    .leftJoinAndSelect('notification.senderCharacter', 'senderCharacter')
    .leftJoinAndSelect('senderCharacter.corporation', 'senderCharacterCorporation')
    .leftJoinAndSelect('senderCharacterCorporation.alliance', 'senderCharacterAlliance')
    .leftJoinAndSelect('notification.senderCorporation', 'senderCorporation')
    .leftJoinAndSelect('senderCorporation.alliance', 'senderCorporationAlliance')
    .leftJoinAndSelect('notification.senderAlliance', 'senderAlliance')
    .leftJoinAndSelect('notification.post', 'post')
    .leftJoinAndSelect('post.character', 'authorCharacter')
    .leftJoinAndSelect('authorCharacter.corporation', 'authorCharacterCorporation')
    .leftJoinAndSelect('authorCharacterCorporation.alliance', 'authorCharacterAlliance')
    .leftJoinAndSelect('post.corporation', 'authorCorporation')
    .leftJoinAndSelect('authorCorporation.alliance', 'authorCorporationAlliance')
    .leftJoinAndSelect('post.alliance', 'authorAlliance')
    .leftJoinAndSelect('post.characterWall', 'onCharacterWall')
    .leftJoinAndSelect('onCharacterWall.corporation', 'onCharacterWallCorporation')
    .leftJoinAndSelect('onCharacterWallCorporation.alliance', 'onCharacterWallAlliance')
    .leftJoinAndSelect('post.corporationWall', 'onCorporationWall')
    .leftJoinAndSelect('onCorporationWall.alliance', 'onCorporationWallAlliance')
    .leftJoinAndSelect('post.allianceWall', 'onAllianceWall')
    .leftJoinAndSelect('post.killmail', 'killmail')
    .leftJoinAndSelect('post.hashtags', 'hashtag')
    .leftJoinAndSelect('post.location', 'location')
    .leftJoinAndSelect('killmail.participants', 'killmailP')
    .leftJoinAndSelect('killmailP.character', 'killmailPCharacter')
    .leftJoinAndSelect('killmailPCharacter.corporation', 'killmailPCorporation')
    .leftJoinAndSelect('killmailPCorporation.alliance', 'killmailPAlliance')
    .leftJoinAndSelect('killmailP.ship', 'killmailPShip')
    .leftJoinAndSelect('killmailPShip.group', 'killmailPShipGroup')
    .leftJoinAndSelect('killmailPShipGroup.category', 'killmailPShipGroupCategory')
    .leftJoinAndSelect('killmailP.weapon', 'killmailPWeapon')
    .leftJoinAndSelect('killmailPWeapon.group', 'killmailPWeaponGroup')
    .leftJoinAndSelect('killmailPWeaponGroup.category', 'killmailPWeaponGroupCategory')
    .where('notification."recipientId" = :characterId', { characterId: character.id })
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
