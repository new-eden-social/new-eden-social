import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ICharacterStatistics } from '../external/zkillboard/zkillboard.interface';
import { IGetCharacter, IGetCharacterPortrait } from '../external/esi/esi.interface';
import { Post } from '../feed/post/post.entity';
import { Comment } from '../comment/comment.entity';
import { ICharacterResponse } from './character.interface';
import { KillmailParticipant } from '../feed/killmail/participant/participant.entity';

@Entity()
export class Character {

  @PrimaryColumn('int')
  id: number;

  @OneToMany(type => Post, post => post.character)
  posts: Post[] = [];

  @OneToMany(type => KillmailParticipant, killmailParticipant => killmailParticipant.character)
  killmails: KillmailParticipant[] = [];

  @OneToMany(type => Comment, comment => comment.character)
  comments: Comment[] = [];

  @CreateDateColumn()
  createdAt: Date;

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

  @Column()
  ancestryId: number;

  @Column()
  securityStatus: number;
  /**
   * Provided by zKillboard (Live, updated on the go)
   */
  iskDestroyed: number;

  public populateESI(char: IGetCharacter) {
    this.name = char.name;
    this.description = char.description;
    this.gender = char.gender;
    this.raceId = char.race_id;
    this.bloodlineId = char.bloodline_id;
    this.ancestryId = char.ancestry_id;
    this.securityStatus = char.security_status;
  }

  get portrait(): IGetCharacterPortrait {
    return {
      px64x64: `https://imageserver.eveonline.com/Character/${this.id}_64.jpg`,
      px128x128: `https://imageserver.eveonline.com/Character/${this.id}_128.jpg`,
      px256x256: `https://imageserver.eveonline.com/Character/${this.id}_256.jpg`,
      px512x512: `https://imageserver.eveonline.com/Character/${this.id}_512.jpg`,
    };
  }
  iskLost: number;
  pointsDestroyed: number;
  pointsLost: number;
  shipsDestroyed: number;
  shipsLost: number;
  soloKills: number;
  soloLosses: number;

  public populateZKillboard(char: ICharacterStatistics) {
    this.iskDestroyed = char.iskDestroyed;
    this.iskLost = char.iskLost;
    this.pointsDestroyed = char.pointsDestroyed;
    this.pointsLost = char.pointsLost;
    this.shipsDestroyed = char.shipsDestroyed;
    this.shipsLost = char.shipsLost;
    this.soloKills = char.soloKills;
    this.soloLosses = char.soloLosses;
  }

  /**
   * Get character response (this is what API returns)
   * @return {ICharacterResponse}
   */
  get response(): ICharacterResponse {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      gender: this.gender,
      raceId: this.raceId,
      bloodlineId: this.bloodlineId,
      ancestryId: this.ancestryId,
      securityStatus: this.securityStatus,
      portrait: this.portrait,
      iskDestroyed: this.iskDestroyed,
      iskLost: this.iskLost,
      pointsDestroyed: this.pointsDestroyed,
      pointsLost: this.pointsLost,
      shipsDestroyed: this.shipsDestroyed,
      shipsLost: this.shipsLost,
      soloKills: this.soloKills,
      soloLosses: this.soloLosses,
    };
  }
}
