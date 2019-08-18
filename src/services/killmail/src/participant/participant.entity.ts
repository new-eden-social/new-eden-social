import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Killmail } from '../killmail.entity';

@Entity()
export class KillmailParticipant {

  @PrimaryGeneratedColumn()
  id: number;

  @JoinTable()
  @ManyToOne(type => Killmail, killmail => killmail.participants)
  killmail: Killmail;

  @Column()
  characterId: number;

  @Column()
  type: 'attacker' | 'victim';

  @Column({ nullable: true })
  shipId?: number; // Sometimes, for some reason. shipId can be null

  // Attacker
  @Column('real', { nullable: true })
  damageDone?: number;

  @Column({ nullable: true })
  finalBlow?: boolean;

  @Column({ nullable: true })
  weaponId?: number;

  // Victim
  @Column('real', { nullable: true })
  damageTaken?: number;

}
