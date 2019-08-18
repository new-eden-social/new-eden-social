import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { AggregateRoot } from '@nestjs/cqrs';
import { UnFollowEvent } from './events/unfollow.event';
import { FollowCharacterEvent, FollowCorporationEvent, FollowAllianceEvent } from './events/follow.event';

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

  async unFollow(): Promise<void> {
    await this.apply(new UnFollowEvent(this));
  }

  async follow(): Promise<void> {
    if (this.followingCharacterId) {
      await this.apply(new FollowCharacterEvent(this));
    } else if (this.followingCorporationId) {
      await this.apply(new FollowCorporationEvent(this));
    } else if (this.followingAllianceId) {
      await this.apply(new FollowAllianceEvent(this));
    }
  }

}
