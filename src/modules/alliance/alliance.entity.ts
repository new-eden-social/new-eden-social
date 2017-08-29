import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Length } from 'class-validator';
import {
  IAllianceStatistics,
  ICharacterStatistics,
  ICorporationStatistics,
} from '../external/zkillboard/zkillboard.interface';
import { IGetAlliance, IGetCharacter, IGetCorporation } from '../external/esi/esi.interface';

@Entity()
export class Alliance {

  @PrimaryColumn('int')
  id: number;

  /**
   * Provided by ESI
   */
  name: string;
  ticker: string;
  dateFounded: Date;
  executorCorp: number;

  public populateESI(alliance: IGetAlliance) {
    this.name = alliance.alliance_name;
    this.ticker = alliance.ticker;
    this.dateFounded = alliance.date_founded;
    this.executorCorp = alliance.executor_corp;
  }

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
