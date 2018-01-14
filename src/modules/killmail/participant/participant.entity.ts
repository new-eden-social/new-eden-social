import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Character } from '../../character/character.entity';
import { Killmail } from '../killmail.entity';

@Entity()
export class KillmailParticipant {

  @PrimaryGeneratedColumn()
  id: number;

  @JoinTable()
  @ManyToOne(type => Killmail, killmail => killmail.participants)
  killmail: Killmail;

  @JoinTable()
  @ManyToOne(type => Character, character => character.killmails)
  character: Character;

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
