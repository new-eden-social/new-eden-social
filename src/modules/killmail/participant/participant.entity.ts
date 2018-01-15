import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Character } from '../../character/character.entity';
import { Killmail } from '../killmail.entity';
import { UniverseType } from '../../universe/type/type.entity';

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

  @ManyToOne(type => UniverseType, { nullable: true, eager: true })
  ship?: UniverseType; // Sometimes, for some reason. shipId can be null

  // Attacker
  @Column('real', { nullable: true })
  damageDone?: number;

  @Column({ nullable: true })
  finalBlow?: boolean;

  @ManyToOne(type => UniverseType, { nullable: true, eager: true })
  weapon?: UniverseType;

  // Victim
  @Column('real', { nullable: true })
  damageTaken?: number;

}
