import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { IAllianceStatistics } from '../external/zkillboard/zkillboard.interface';
import { IGetAlliance } from '../external/esi/esi.interface';
import { Corporation } from '../corporation/corporation.entity';
import { IAllianceResponse } from './alliance.interface';

@Entity()
export class Alliance {

  @PrimaryColumn('int')
  id: number;

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

  /**
   * Get alliance response (This is what API returns)
   * @returns {IAllianceResponse}
   */
  get response(): IAllianceResponse {
    return {
      id: this.id,
      name: this.name,
      ticker: this.ticker,
      dateFounded: this.dateFounded,
      executorCorporation: this.executorCorporation,
      hasSupers: this.hasSupers,
      iskDestroyed: this.iskDestroyed,
      iskLost: this.iskLost,
      pointsDestroyed: this.pointsDestroyed,
      pointsLost: this.pointsLost,
      shipsDestroyed: this.shipsDestroyed,
      shipsLost: this.shipsLost,
      soloKills: this.soloKills,
      soloLosses: this.soloLosses,
      memberCount: this.memberCount,
      corpCount: this.corpCount,
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
