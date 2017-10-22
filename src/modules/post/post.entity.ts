import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Character } from '../character/character.entity';
import { Comment } from '../comment/comment.entity';
import { v4 as uuid } from 'uuid';
import { ICreatePostRequest, IPostResponse } from './post.interface';
import { Killmail } from '../killmail/killmail.entity';

@Entity()
export class Post {

  constructor(postData?: ICreatePostRequest) {
    this.id = uuid();

    if (postData) {
      this.content = postData.content;
      this.type = postData.type;
      this.locationId = postData.locationId;
    }
  }

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

  @ManyToOne(type => Character, character => character.posts)
  character: Character;

  @OneToMany(type => Comment, comment => comment.post)
  comments: Comment[];

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
