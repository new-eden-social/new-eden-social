import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne, CreateDateColumn } from 'typeorm';
import { Post } from '../post/post.entity';
import { Character } from '../character/character.entity';
import { v4 as uuid } from 'uuid';

@Entity()
export class Comment {

  constructor() {
    this.id = uuid();
  }

  @PrimaryColumn('uuid')
  id: string;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(type => Post, post => post.comments)
  post: Post;

  @ManyToOne(type => Character, character => character.comments)
  character: Character;

}
