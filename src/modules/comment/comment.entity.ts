import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne, CreateDateColumn } from 'typeorm';
import { Post } from '../feed/post/post.entity';
import { Character } from '../character/character.entity';
import { v4 as uuid } from 'uuid';
import { Killmail } from '../feed/killmail/killmail.entity';

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

  @ManyToOne(type => Killmail, killmail => killmail.comments)
  killmail: Killmail;

  @ManyToOne(type => Character, character => character.comments)
  character: Character;

}
