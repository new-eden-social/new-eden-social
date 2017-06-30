import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne, CreateDateColumn } from 'typeorm';
import { Character } from '../character/character.entety';
import { Comment } from '../comment/comment.entety';
import { v4 as uuid } from 'uuid';
import { CreatePostRequest, PostResponse } from './post.interface';

@Entity()
export class Post {

  constructor() {
    this.id = uuid();
  }

  @PrimaryColumn('uuid')
  id: string;

  @Column()
  title: string;

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

  populateRequestData(postData: CreatePostRequest) {
    this.title = postData.title;
    this.content = postData.content;
    this.previewUrl = postData.previewUrl;
    this.previewImage = postData.previewImage;
    this.previewTitle = postData.previewTitle;
    this.previewDescription = postData.previewDescription;
  }

  get response(): PostResponse {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      previewUrl: this.previewUrl,
      previewImage: this.previewImage,
      previewTitle: this.previewTitle,
      previewDescription: this.previewDescription,

      character: this.character.response,
    }
  }
}
