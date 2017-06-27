import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Length } from 'class-validator';

@Entity()
export class Character {
  constructor(name: string) {
    this.name = name;
  }

  @PrimaryColumn('int')
  id: number;

  @Column()
  @Length(2, 15)
  name: string;
}
