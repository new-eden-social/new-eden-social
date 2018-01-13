import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { ICorporationStatistics } from '../external/zkillboard/zkillboard.interface';
import { IGetCorporation } from '../external/esi/esi.interface';
import { Character } from '../character/character.entity';
import { Alliance } from '../alliance/alliance.entity';
import { ICorporationResponse } from './corporation.interface';
import { Post } from '../post/post.entity';

@Entity()
export class Corporation {

  @PrimaryColumn('int')
  id: number;

  @Column()
  name: string;

  @Column()
  ticker: string;

  @Column('text')
  description: string;

  @Column()
  url: string;

  @ManyToOne(type => Character, character => character.corporationCeo)
  ceo?: Character;

  @ManyToOne(type => Character, character => character.createdCorporations)
  creator?: Character;

  @ManyToOne(type => Alliance, alliance => alliance.corporations, { eager: true })
  alliance?: Alliance;

  @OneToMany(type => Character, character => character.corporation)
  characters: Character[];

  @OneToMany(type => Post, post => post.corporationWall)
  wall: Post[];

  @OneToMany(type => Post, post => post.corporation)
  posts: Post[];

  @OneToOne(type => Alliance, alliance => alliance.executorCorporation)
  executingAlliance: Alliance;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column()
  updatedAt: Date = new Date();

  @Column('real')
  taxRate: number;

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

  /**
   * Get corporation response (this is what API returns)
   * @return {ICorporationResponse}
   */
  get response(): ICorporationResponse {
    return {
      id: this.id,
      name: this.name,
      ticker: this.ticker,
      description: this.description,
      url: this.url,
      alliance: this.alliance ? this.alliance.response : null,
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

  public populateESI(corp: IGetCorporation) {
    this.name = corp.name;
    this.ticker = corp.ticker;
    this.description = corp.description;
    this.url = corp.url;
    this.createdAt = corp.creation_date;
    this.taxRate = corp.tax_rate;
  }

  public populateZKillboard(corp: ICorporationStatistics) {
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
