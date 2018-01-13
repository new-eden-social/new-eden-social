import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Character } from '../character/character.entity';
import { Comment } from '../comment/comment.entity';
import { v4 as uuid } from 'uuid';
import { IPostResponse } from './post.interface';
import { Killmail } from '../killmail/killmail.entity';
import { Corporation } from '../corporation/corporation.entity';
import { Alliance } from '../alliance/alliance.entity';
import { ICreatePostRequest } from './post.validate';

@Entity()
export class Post {

  @Column('text', { nullable: true })
  content: string;

  @PrimaryColumn('uuid')
  id: string;

  @Column({ nullable: true })
  locationId: number;

  @Column()
  type: string;

  @ManyToOne(type => Killmail, killmail => killmail.posts)
  killmail: Killmail;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(type => Character, character => character.posts, { nullable: true })
  character?: Character;

  @ManyToOne(type => Corporation, corporation => corporation.posts, { nullable: true })
  corporation?: Corporation;

  @ManyToOne(type => Alliance, alliance => alliance.posts, { nullable: true })
  alliance?: Alliance;

  @OneToMany(type => Comment, comment => comment.post)
  comments: Comment[];

  @ManyToOne(type => Character, character => character.wall, { nullable: true })
  characterWall?: Character;

  @ManyToOne(type => Corporation, corporation => corporation.wall, { nullable: true })
  corporationWall?: Corporation;

  @ManyToOne(type => Alliance, alliance => alliance.wall, { nullable: true })
  allianceWall?: Alliance;

  constructor(postData?: ICreatePostRequest) {
    this.id = uuid();

    if (postData) {
      this.content = postData.content;
      this.type = postData.type;
      this.locationId = postData.locationId;
    }
  }

  /**
   * Get Response
   * @return {IPostResponse}
   */
  get response(): IPostResponse {
    return {
      id: this.id,
      content: this.content,
      type: this.type,

      character: this.character.response,
    };
  }
}
