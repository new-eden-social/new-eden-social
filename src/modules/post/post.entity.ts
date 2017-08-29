import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne, CreateDateColumn } from 'typeorm';
import { Character } from '../character/character.entity';
import { Comment } from '../comment/comment.entity';
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

  @Column({ nullable: true })
  previewUrl?: string;

  @Column({ nullable: true })
  previewImage?: string;

  @Column({ nullable: true })
  previewTitle?: string;

  @Column('text', { nullable: true })
  previewDescription?: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(type => Character, character => character.posts)
  character: Character;

  @OneToMany(type => Comment, comment => comment.post)
  comments: Comment[];

  populateRequestData(postData: ICreatePostRequest) {
    this.content = postData.content;
    this.previewUrl = postData.previewUrl;
    this.previewImage = postData.previewImage;
    this.previewTitle = postData.previewTitle;
    this.previewDescription = postData.previewDescription;
  }

  get response(): IPostResponse {
    return {
      id: this.id,
      content: this.content,
      previewUrl: this.previewUrl,
      previewImage: this.previewImage,
      previewTitle: this.previewTitle,
      previewDescription: this.previewDescription,

      character: this.character.response,
    }
  }
}
