import { Column, Entity, JoinTable, OneToMany, PrimaryColumn } from 'typeorm';
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

  @Column()
  npc: boolean = false;

  @Column('timestamp')
  createdAt: Date;

  @JoinTable()
  @OneToMany(type => KillmailParticipant, participant => participant.killmail)
  participants: KillmailParticipant[] = [];

  @JoinTable()
  @OneToMany(type => Comment, comment => comment.killmail)
  comments: Comment[] = [];

}
