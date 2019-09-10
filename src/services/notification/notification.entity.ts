import { AggregateRoot } from '@nestjs/cqrs';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { NOTIFICATION_TYPE } from './notification.constants';

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
  commentId?: string;
}
