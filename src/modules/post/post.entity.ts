import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Character } from '../character/character.entity';
import { Comment } from '../comment/comment.entity';
import { Killmail } from '../killmail/killmail.entity';
import { Corporation } from '../corporation/corporation.entity';
import { Alliance } from '../alliance/alliance.entity';
import { Hashtag } from '../hashtag/hashtag.entity';
import { POST_TYPES } from './post.constants';
import { UniverseLocation } from '../universe/location/location.entity';
import { AggregateRoot } from '@nestjs/cqrs';
import {
  CharacterPostedEvent,
  CharacterPostedOnAllianceWallEvent, CharacterPostedOnCharacterWallEvent,
  CharacterPostedOnCorporationWallEvent,
} from './events/create.character.event';
import {
  AlliancePostedEvent,
  AlliancePostedOnAllianceWallEvent, AlliancePostedOnCharacterWallEvent,
  AlliancePostedOnCorporationWallEvent,
} from './events/create.alliance.event';
import {
  CorporationPostedEvent,
  CorporationPostedOnAllianceWallEvent,
  CorporationPostedOnCharacterWallEvent,
  CorporationPostedOnCorporationWallEvent,
} from './events/create.corporation.event';

@Entity()
export class Post extends AggregateRoot {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: true })
  content: string;

  @Column('varchar')
  type: POST_TYPES;

  @ManyToOne(type => Killmail, killmail => killmail.posts, { nullable: true, eager: true })
  killmail: Killmail;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(type => UniverseLocation, location => location.posts, { nullable: true, eager: true })
  location: UniverseLocation;

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

  /**
   * Sends proper events on post creation
   * @return {Promise<Post>}
   */
  public async create(): Promise<Post> {
    if (this.character) {
      if (this.characterWall) {
        await this.apply(new CharacterPostedOnCharacterWallEvent(this));
      } else if (this.corporationWall) {
        await this.apply(new CharacterPostedOnCorporationWallEvent(this));
      } else if (this.allianceWall) {
        await this.apply(new CharacterPostedOnAllianceWallEvent(this));
      } else {
        await this.apply(new CharacterPostedEvent(this));
      }
    }
    if (this.corporation) {
      if (this.characterWall) {
        await this.apply(new CorporationPostedOnCharacterWallEvent(this));
      } else if (this.corporationWall) {
        await this.apply(new CorporationPostedOnCorporationWallEvent(this));
      } else if (this.allianceWall) {
        await this.apply(new CorporationPostedOnAllianceWallEvent(this));
      } else {
        await this.apply(new CorporationPostedEvent(this));
      }
    }
    if (this.alliance) {
      if (this.characterWall) {
        await this.apply(new AlliancePostedOnCharacterWallEvent(this));
      } else if (this.corporationWall) {
        await this.apply(new AlliancePostedOnCorporationWallEvent(this));
      } else if (this.allianceWall) {
        await this.apply(new AlliancePostedOnAllianceWallEvent(this));
      } else {
        await this.apply(new AlliancePostedEvent(this));
      }
    }
    return this;
  }
}
