import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Character } from '../character/character.entity';
import { Comment } from '../comment/comment.entity';
import { v4 as uuid } from 'uuid';
import { Killmail } from '../killmail/killmail.entity';
import { Corporation } from '../corporation/corporation.entity';
import { Alliance } from '../alliance/alliance.entity';
import { ICreatePostRequest } from './post.validate';
import { Hashtag } from '../hashtag/hashtag.entity';
import { Location } from '../location/location.entity';
import { POST_TYPES } from './post.constants';

@Entity()
export class Post {

  @Column('text', { nullable: true })
  content: string;

  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar')
  type: POST_TYPES;

  @ManyToOne(type => Killmail, killmail => killmail.posts, { nullable: true, eager: true })
  killmail: Killmail;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(type => Location, location => location.posts, { nullable: true, eager: true })
  location: Location;

  @ManyToOne(type => Character, character => character.posts, { nullable: true, eager: true })
  character?: Character;

  @ManyToOne(type => Corporation, corporation => corporation.posts, { nullable: true, eager: true })
  corporation?: Corporation;

  @ManyToOne(type => Alliance, alliance => alliance.posts, { nullable: true, eager: true })
  alliance?: Alliance;

  @OneToMany(type => Comment, comment => comment.post)
  comments: Comment[];

  @ManyToOne(type => Character, character => character.wall, { nullable: true, eager: true })
  characterWall?: Character;

  @ManyToOne(type => Corporation, corporation => corporation.wall, { nullable: true, eager: true })
  corporationWall?: Corporation;

  @ManyToOne(type => Alliance, alliance => alliance.wall, { nullable: true, eager: true })
  allianceWall?: Alliance;

  @ManyToMany(type => Hashtag, { eager: true })
  @JoinTable()
  hashtags: Hashtag[];

  constructor(postData?: ICreatePostRequest) {
    this.id = uuid();

    if (postData) {
      this.content = postData.content;
      this.type = postData.type;
    }
  }
}
