import { Column, Entity, JoinTable, OneToMany, PrimaryColumn } from 'typeorm';
import { KillmailParticipant } from './participant/participant.entity';
import { Post } from '../post/post.entity';

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
  participants: KillmailParticipant[];

  @OneToMany(type => Post, post => post.killmail)
  posts: Post[];
}
