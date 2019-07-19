import { Column, Entity, JoinTable, OneToMany, PrimaryColumn } from 'typeorm';
import { KillmailParticipant } from './participant/participant.entity';
import { Post } from '@new-eden-social/api-post';

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
  npc = false;

  @Column('timestamp')
  createdAt: Date;

  @JoinTable()
  @OneToMany(type => KillmailParticipant, participant => participant.killmail, { eager: true })
  participants: KillmailParticipant[];

  @OneToMany(type => Post, post => post.killmail)
  posts: Post[];
}
