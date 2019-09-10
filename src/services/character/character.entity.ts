import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IGetCharacter } from '@new-eden-social/esi';
import { ICharacterPortrait } from '@new-eden-social/services-character/character.interface';

@Entity()
export class Character {

  @PrimaryColumn('int')
  id: number;

  @Column({ unique: true })
  handle: string;

  @Column()
  corporationId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column()
  gender: string;

  @Column()
  raceId: number;

  @Column()
  bloodlineId: number;

  @Column({ nullable: true })
  ancestryId: number;

  @Column('real')
  securityStatus: number;

  get portrait(): ICharacterPortrait {
    return {
      px64x64: `https://imageserver.eveonline.com/Character/${this.id}_64.jpg`,
      px128x128: `https://imageserver.eveonline.com/Character/${this.id}_128.jpg`,
      px256x256: `https://imageserver.eveonline.com/Character/${this.id}_256.jpg`,
      px512x512: `https://imageserver.eveonline.com/Character/${this.id}_512.jpg`,
    };
  }

  public populateESI(character: IGetCharacter) {
    this.name = character.name;
    this.description = character.description;
    this.gender = character.gender;
    this.raceId = character.race_id;
    this.bloodlineId = character.bloodline_id;
    this.ancestryId = character.ancestry_id;
    this.securityStatus = character.security_status;
    if (character.corporation_id && character.corporation_id !== 1) {
      this.corporationId = character.corporation_id;
    }
  }
}
