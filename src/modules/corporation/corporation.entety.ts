import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Length } from 'class-validator';
import {
  CharacterStatistics,
  CorporationStatistics,
} from '../external/zkillboard/zkillboard.interface';
import { GetCharacter, GetCorporation } from '../external/esi/esi.interface';

@Entity()
export class Corporation {

  @PrimaryColumn('int')
  id: number;

  /**
   * Provided by ESI
   */
  name: string;
  ticker: string;
  description: string;
  url: string;
  memberCount: number;
  ceoId: number;
  allianceId: number;
  creatorId: number;
  creationDate: Date;
  taxRate: number;

  public populateESI(corp: GetCorporation) {
    this.name = corp.corporation_name;
    this.ticker = corp.ticker;
    this.description = corp.corporation_description;
    this.url = corp.url;
    this.memberCount = corp.member_count;
    this.ceoId = corp.ceo_id;
    this.allianceId = corp.alliance_id;
    this.creatorId = corp.creator_id;
    this.creationDate = corp.creation_date;
    this.taxRate = corp.tax_rate;
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

  public populateZKillboard(corp: CorporationStatistics) {
    this.iskDestroyed = corp.iskDestroyed;
    this.iskLost = corp.iskLost;
    this.pointsDestroyed = corp.pointsDestroyed;
    this.pointsLost = corp.pointsLost;
    this.shipsDestroyed = corp.shipsDestroyed;
    this.shipsLost = corp.shipsLost;
    this.soloKills = corp.soloKills;
    this.soloLosses = corp.soloLosses;
    this.hasSupers = corp.hasSupers;
  }

}
