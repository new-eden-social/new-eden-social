import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Follow {

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
