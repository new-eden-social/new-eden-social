import { AggregateRoot } from '@nestjs/cqrs';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from '@new-eden-social/api-comment';
import { NOTIFICATION_TYPE } from './notification.constants';
import { CreateNotificationEvent } from './events/create.event';
import { SeenNotificationEvent } from './events/seen.event';

@Entity()
export class Notification extends AggregateRoot {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  eventUuid: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  seenAt: Date;

  @Column('varchar')
  type: NOTIFICATION_TYPE;

  @Column()
  recipientId: number;

  @Column()
  senderCharacterId?: number;

  @Column()
  senderCorporationId?: number;

  @Column()
  senderAllianceId?: number;

  @Column()
  postId?: string;

  @Column()
  comment?: Comment;

  /**
   * Sends proper event on notification creation
   * @return {Promise<Notification>}
   */
  public async create(): Promise<Notification> {
    await this.apply(new CreateNotificationEvent(this));
    return this;
  }

  /**
   * Sends proper event on notification seen
   * @return {Promise<Notification>}
   */
  public async seen(): Promise<Notification> {
    await this.apply(new SeenNotificationEvent(this));
    return this;
  }
}
