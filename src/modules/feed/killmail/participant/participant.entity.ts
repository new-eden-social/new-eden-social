import {
  Entity, Column, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { Character } from '../../../character/character.entity';
import { Killmail } from '../killmail.entity';

@Entity()
export class KillmailParticipant {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Killmail, killmail => killmail.participants)
  killmail: Killmail;

  @ManyToOne(type => Character, character => character.killmails)
  character: Character;

  @Column()
  type: string; // attacker | victim

  @Column()
  shipId: number;


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
