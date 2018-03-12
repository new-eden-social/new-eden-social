import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IAllianceStatistics } from '../common/external/zkillboard/zkillboard.interface';
import { IGetAlliance } from '../common/external/esi/esi.interface';
import { Corporation } from '../corporation/corporation.entity';
import { Post } from '../post/post.entity';
import { IAllianceIcon } from './alliance.interface';

@Entity()
export class Alliance {

  @PrimaryColumn('int')
  id: number;

  @Column({ unique: true })
  handle: string;

  @OneToMany(type => Corporation, corporation => corporation.alliance)
  corporations: Corporation[];

  @Column()
  name: string;

  @Column()
  ticker: string;

  @Column()
  dateFounded: Date;

  @OneToOne(type => Corporation, corporation => corporation.executingAlliance)
  @JoinColumn()
  executorCorporation: Corporation;

  @OneToMany(type => Post, post => post.allianceWall)
  wall: Post[];

  @OneToMany(type => Post, post => post.alliance)
  posts: Post[];

  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * Provided by zKillboard
   */
  hasSupers: boolean;
  iskDestroyed: number;
  iskLost: number;
  pointsDestroyed: number;
  pointsLost: number;
  shipsDestroyed: number;
  shipsLost: number;
  soloKills: number;
  soloLosses: number;
  memberCount: number;
  corpCount: number;

  get icon(): IAllianceIcon {
    return {
      px64x64: `http://image.eveonline.com/Alliance/${this.id}_64.png`,
      px128x128: `http://image.eveonline.com/Alliance/${this.id}_128.png`,
    };
  }

  public populateESI(alliance: IGetAlliance) {
    this.name = alliance.name;
    this.ticker = alliance.ticker;
    this.dateFounded = alliance.date_founded;
  }

  public populateZKillboard(alliance: IAllianceStatistics) {
    this.iskDestroyed = alliance.iskDestroyed;
    this.iskLost = alliance.iskLost;
    this.pointsDestroyed = alliance.pointsDestroyed;
    this.pointsLost = alliance.pointsLost;
    this.shipsDestroyed = alliance.shipsDestroyed;
    this.shipsLost = alliance.shipsLost;
    this.soloKills = alliance.soloKills;
    this.soloLosses = alliance.soloLosses;
    this.hasSupers = alliance.hasSupers;
    this.memberCount = alliance.info.memberCount;
    this.corpCount = alliance.info.corpCount;
  }

}
