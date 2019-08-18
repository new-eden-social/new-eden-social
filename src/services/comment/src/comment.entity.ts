import {
  Column, CreateDateColumn, Entity, ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
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

  @Column()
  postId: string;

  @Column()
  characterId?: number;

  @Column()
  corporationId?: number;

  @Column()
  allianceId?: number;

  /**
   * Sends proper event on comment creation
   * @return {Promise<Comment>}
   */
  public async create(): Promise<Comment> {
    await this.apply(new CreateCommentEvent(this));
    return this;
  }
}
