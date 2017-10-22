import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { IAllianceStatistics } from '../external/zkillboard/zkillboard.interface';
import { IGetAlliance } from '../external/esi/esi.interface';
import { Corporation } from '../corporation/corporation.entity';

@Entity()
export class Alliance {

  @PrimaryColumn('int')
  id: number;

  @OneToMany(type => Corporation, corporation => corporation.alliance)
  corporations: Corporation[] = [];

  /**
   * Provided by ESI
   */
  name: string;
  ticker: string;
  dateFounded: Date;
  executorCorp: number;
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

  public populateESI(alliance: IGetAlliance) {
    this.name = alliance.alliance_name;
    this.ticker = alliance.ticker;
    this.dateFounded = alliance.date_founded;
    this.executorCorp = alliance.executor_corp;
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
