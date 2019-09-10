import {
  Column, CreateDateColumn, Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {

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
}
