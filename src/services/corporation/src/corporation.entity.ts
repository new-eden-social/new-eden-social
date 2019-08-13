import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IGetCorporation } from '@new-eden-social/esi';
import { Character } from '@new-eden-social/api-character';
import { Alliance } from '@new-eden-social/api-alliance';
import { Post } from '@new-eden-social/api-post';
import { ICorporationIcon } from './corporation.interface';
import { Comment } from '@new-eden-social/api-comment';
import { Follow } from '@new-eden-social/api-follow';

@Entity()
export class Corporation {

  @PrimaryColumn('int')
  id: number;

  @Column({ unique: true })
  handle: string;

  @Column()
  name: string;

  @Column()
  ticker: string;

  @Column('text')
  description: string;

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

  @OneToMany(type => Comment, comment => comment.corporation)
  comments: Comment[];

  @OneToOne(type => Alliance, alliance => alliance.executorCorporation)
  executingAlliance: Alliance;

  @OneToMany(type => Follow, follow => follow.followingCorporation)
  followers: Promise<Follow[]>;

  @Column({ nullable: true })
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('real')
  taxRate: number;

  get icon(): ICorporationIcon {
    return {
      px64x64: `http://image.eveonline.com/Corporation/${this.id}_64.png`,
      px128x128: `http://image.eveonline.com/Corporation/${this.id}_128.png`,
      px256x256: `http://image.eveonline.com/Corporation/${this.id}_256.png`,
    };
  }

  public populateESI(corp: IGetCorporation) {
    this.name = corp.name;
    this.ticker = corp.ticker;
    this.description = corp.description;
    this.createdAt = corp.creation_date;
    this.taxRate = corp.tax_rate;
  }
}
