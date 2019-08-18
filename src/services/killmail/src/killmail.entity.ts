import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
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
  npc = false;

  @Column('timestamp')
  createdAt: Date;

  @OneToMany(type => KillmailParticipant, participant => participant.killmail, { eager: true })
  participants: KillmailParticipant[];
}
