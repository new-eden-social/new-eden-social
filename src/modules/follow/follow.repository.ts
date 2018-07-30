import { EntityRepository, Repository } from "typeorm";
import { Follow } from "./follow.entity";
import { Character } from "../character/character.entity";
import { Corporation } from "../corporation/corporation.entity";
import { Alliance } from "../alliance/alliance.entity";

@EntityRepository(Follow)
export class FollowRepository extends Repository<Follow> {

    getFollowingCharacter(
        follower: Character,
        followingCharacter: Character,
    ): Promise<Follow> {
        return this.findOne({
            where: {
                follower,
                followingCharacter,
            }
        });
    }

    getFollowingCorporation(
        follower: Character,
        followingCorporation: Corporation,
    ): Promise<Follow> {
        return this.findOne({
            where: {
                follower,
                followingCorporation,
            }
        });
    }

    getFollowingAlliance(
        follower: Character,
        followingAlliance: Alliance,
    ): Promise<Follow> {
        return this.findOne({
            where: {
                follower,
                followingAlliance,
            }
        });
    }

}
