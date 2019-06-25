import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Hashtag {

  @PrimaryColumn('text')
  name: string;

  constructor(name: string) {
    this.name = name;
  }

}
