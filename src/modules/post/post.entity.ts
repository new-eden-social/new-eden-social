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
import { CharacterCreatedPostEvent } from './events/create.event';

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
   * Sends CreatePostCommand
   * @return {Promise<Post>}
   */
  public async create(): Promise<Post> {
    if (this.character) {
      await this.apply(new CharacterCreatedPostEvent(this));
    }
    return this;
  }
}
