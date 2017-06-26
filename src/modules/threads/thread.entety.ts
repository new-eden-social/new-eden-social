import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { IsNotEmpty, Length } from 'class-validator';
import { Board } from '../boards/board.entety';

@Entity()
export class Thread {
  constructor(name: string, content: string) {
    this.name = name;
    this.content = content;
  }

  @PrimaryColumn('int', { generated: true })
  id: number;

  @ManyToOne(type => Board, board => board.threads)
  board: Board;

  @Column()
  @Length(2, 15)
  name: string;

  @Column()
  @IsNotEmpty()
  content: string;
}
