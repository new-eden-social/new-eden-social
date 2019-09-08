import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { AggregateRoot } from '@nestjs/cqrs';

@Entity()
export class Follow extends AggregateRoot {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  followerId: number;

  @Column()
  followingCharacterId: number;

  @Column()
  followingCorporationId: number;

  @Column()
  followingAllianceId: number;
}
