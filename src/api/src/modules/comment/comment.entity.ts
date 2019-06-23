import {
  Column, CreateDateColumn, Entity, ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../post/post.entity';
import { Character } from '../character/character.entity';
import { Corporation } from '../corporation/corporation.entity';
import { Alliance } from '../alliance/alliance.entity';
import { AggregateRoot } from '@nestjs/cqrs';
import { CreateCommentEvent } from './events/create.event';

@Entity()
export class Comment extends AggregateRoot {

  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('text')
  content: string;
  @CreateDateColumn()
  createdAt: Date;
  @ManyToOne(type => Post, post => post.comments)
  post: Post;
  @ManyToOne(type => Character, character => character.comments, { nullable: true, eager: true })
  character?: Character;
  @ManyToOne(
    type => Corporation,
    corporation => corporation.comments,
    { nullable: true, eager: true })
  corporation?: Corporation;
  @ManyToOne(type => Alliance, alliance => alliance.comments, { nullable: true, eager: true })
  alliance?: Alliance;

  /**
   * Sends proper event on comment creation
   * @return {Promise<Comment>}
   */
  public async create(): Promise<Comment> {
    await this.apply(new CreateCommentEvent(this));
    return this;
  }
}
