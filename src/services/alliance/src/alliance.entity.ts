import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IGetAlliance } from '@new-eden-social/esi';
import { Corporation } from '@new-eden-social/api-corporation';
import { Post } from '@new-eden-social/api-post';
import { IAllianceIcon } from './alliance.interface';
import { Comment } from '@new-eden-social/api-comment';
import { Follow } from '@new-eden-social/api-follow';

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

  @OneToMany(type => Comment, comment => comment.alliance)
  comments: Comment[];

  @OneToMany(type => Follow, follow => follow.followingAlliance)
  followers: Promise<Follow[]>;

  @UpdateDateColumn()
  updatedAt: Date;

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
}
