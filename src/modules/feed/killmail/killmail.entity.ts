import {
  Entity, Column, PrimaryColumn, OneToMany, OneToOne,
} from 'typeorm';
import { Comment } from '../../comment/comment.entity';
import { KillmailParticipant } from './participant/participant.entity';

@Entity()
export class Killmail {

  @PrimaryColumn()
  id: number;

  @Column()
  locationId: number;

  @Column({ nullable: true })
  warId?: number;

  @Column('real')
  totalValue: number;

  @Column('real', {nullable: true})
  fittedValue?: number;

  @Column()
  npc: boolean = false;

  @Column('timestamp')
  createdAt: Date;

  @OneToOne(type => KillmailParticipant, participant => participant.killmail)
  participants: KillmailParticipant[] = [];

  @OneToMany(type => Comment, comment => comment.killmail)
  comments: Comment[] = [];
}
