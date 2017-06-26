import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Length } from 'class-validator';
import { Thread } from '../threads/thread.entety';

@Entity()
export class Board {
  constructor(name: string) {
    this.name = name;
  }

  @PrimaryColumn('int', { generated: true })
  id: number;

  @OneToMany(type => Thread, thread => thread.board)
  threads: Thread[];

  @Column()
  @Length(2, 15)
  name: string;
}
