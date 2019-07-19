import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { AggregateRoot } from '@nestjs/cqrs';
import { Character } from '@new-eden-soci@new-eden-social/api-character';
import { Corporation } from '@new-eden-social/api-corporation';
import { Alliance } from '@new-eden-social/api-alliance';
import { UnFollowEvent } from './events/unfollow.event';
import { FollowCharacterEvent, FollowCorporationEvent, FollowAllianceEvent } from './events/follow.event';

@Entity()
export class Follow extends AggregateRoot {

  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ManyToOne(type => Character, character => character.following, { eager: true })
    follower: Character;

  @ManyToOne(type => Character, character => character.followers, { eager: true })
    followingCharacter: Character;

  @ManyToOne(type => Corporation, corporation => corporation.followers, { eager: true })
    followingCorporation: Corporation;

  @ManyToOne(type => Alliance, alliance => alliance.followers, { eager: true })
    followingAlliance: Alliance;

  async unFollow(): Promise<void> {
    await this.apply(new UnFollowEvent(this));
  }

  async follow(): Promise<void> {
    if (this.followingCharacter) {
      await this.apply(new FollowCharacterEvent(this));
    } else if (this.followingCorporation) {
      await this.apply(new FollowCorporationEvent(this));
    } else if (this.followingAlliance) {
      await this.apply(new FollowAllianceEvent(this));
    }
  }

}
