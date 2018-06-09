import { AggregateRoot } from '@nestjs/cqrs';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Character } from '../character/character.entity';
import { Post } from '../post/post.entity';
import { Comment } from '../comment/comment.entity';
import { NOTIFICATION_TYPE } from './notification.constants';

@Entity()
export class Notification extends AggregateRoot {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  seenAt: Date;

  @Column('varchar')
  type: NOTIFICATION_TYPE;

  @ManyToOne(type => Character, character => character.notifications, { nullable: true })
  recipient?: Character;

  @ManyToOne(type => Post, null, { nullable: true })
  post?: Post;

  @ManyToOne(type => Comment, null, { nullable: true })
  comment?: Comment;
}
