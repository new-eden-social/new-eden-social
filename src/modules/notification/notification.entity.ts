import { AggregateRoot } from '@nestjs/cqrs';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Character } from '../character/character.entity';
import { Post } from '../post/post.entity';
import { Comment } from '../comment/comment.entity';
import { NOTIFICATION_TYPE } from './notification.constants';
import { Alliance } from '../alliance/alliance.entity';
import { Corporation } from '../corporation/corporation.entity';
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

  @ManyToOne(type => Character)
  recipient: Character;

  @ManyToOne(type => Character, null, { nullable: true, eager: true })
  senderCharacter?: Character;

  @ManyToOne(type => Corporation, null, { nullable: true, eager: true })
  senderCorporation?: Corporation;

  @ManyToOne(type => Alliance, null, { nullable: true, eager: true })
  senderAlliance?: Alliance;

  @ManyToOne(type => Post, null, { nullable: true })
  post?: Post;

  @ManyToOne(type => Comment, null, { nullable: true })
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
