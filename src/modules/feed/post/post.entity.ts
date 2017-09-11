import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Character } from '../../character/character.entity';
import { Comment } from '../../comment/comment.entity';
import { v4 as uuid } from 'uuid';
import { ICreatePostRequest, IPostResponse } from './post.interface';

@Entity()
export class Post {

  constructor() {
    this.id = uuid();
  }

  @PrimaryColumn('uuid')
  id: string;

  @Column('text')
  content: string;

  @Column()
  type: string;

  @Column()
  locationId: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(type => Character, character => character.posts)
  character: Character;

  @OneToMany(type => Comment, comment => comment.post)
  comments: Comment[] = [];

  /**
   * Populate instance with PostData
   * @param {ICreatePostRequest} postData
   */
  populateRequestData(postData: ICreatePostRequest) {
    this.content = postData.content;
    this.type = postData.type;
    this.locationId = postData.locationId;
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
