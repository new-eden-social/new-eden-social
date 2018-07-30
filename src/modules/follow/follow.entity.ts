import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { AggregateRoot } from "@nestjs/cqrs";
import { Character } from "../character/character.entity";
import { Corporation } from "../corporation/corporation.entity";
import { Alliance } from "../alliance/alliance.entity";
import { UnFollowEvent } from "./events/unfollow.event";
import { FollowEvent, FollowCharacterEvent, FollowCorporationEvent, FollowAllianceEvent } from "./events/follow.event";

@Entity()
export class Follow extends AggregateRoot {

    @PrimaryGeneratedColumn('uuid')
    id: string;
 
    @ManyToOne(type => Character, character => character.following)
    follower: Character;

    @ManyToOne(type => Character, character => character.followers)
    followingCharacter: Character;

    @ManyToOne(type => Corporation, corporation => corporation.followers)
    followingCorporation: Corporation;

    @ManyToOne(type => Alliance, alliance => alliance.followers)
    followingAlliance: Alliance;

    async unFollow(): Promise<void> {
        await this.apply(new UnFollowEvent(this));
    }

    async follow(): Promise<void> {
        if (this.followingCharacter) {
            await this.apply(new FollowCharacterEvent(this));
        } else if(this.followingCorporation) {
            await this.apply(new FollowCorporationEvent(this));
        } else if(this.followingAlliance) {
            await this.apply(new FollowAllianceEvent(this));
        }
    }

}
