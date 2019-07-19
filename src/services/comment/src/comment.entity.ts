import {
  Column, CreateDateColumn, Entity, ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '@new-eden-social/api-post';
import { Character } from '@new-eden-soci@new-eden-social/api-character';
import { Corporation } from '@new-eden-social/api-corporation';
import { Alliance } from '@new-eden-social/api-alliance';
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
