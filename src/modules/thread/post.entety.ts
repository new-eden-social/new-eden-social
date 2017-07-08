import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne, CreateDateColumn } from 'typeorm';
import { Length } from 'class-validator';
import { Character } from '../character/character.entety';
import { Comment } from '../comment/comment.entety';
import { v4 as uuid } from 'uuid';

@Entity()
export class Post {

  constructor() {
    // Generate uuid
    this.id = uuid();
  }

  @PrimaryColumn('uuid')
  id: string;

  @Column('text')
  content: string;

  @Column()
  previewUrl: string;

  @Column()
  previewImage: string;

  @Column()
  previewTitle: string;

  @Column('text')
  previewDescription: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(type => Character, character => character.posts)
  character: Character;

  @OneToMany(type => Comment, comment => comment.post)
  comments: Comment[];
}
