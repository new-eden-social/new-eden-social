import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePostSingleModule } from './post-single/post-single.module';
import { ProfilePostListModule } from './post-list/post-list.module';
import { AllianceModule } from './alliance/alliance.module';
import { CharacterModule } from './character/character.module';
import { CorporationModule } from './corporation/corporation.module';
import { DescriptionModule } from './description/description.module';
import {FollowersModule} from './followers/followers.module';
import {FollowingModule} from './following/following.module';

@NgModule({
  imports: [
    CommonModule,
    ProfilePostSingleModule,
    ProfilePostListModule,
    AllianceModule,
    CharacterModule,
    CorporationModule,
    DescriptionModule,
    FollowersModule,
    FollowingModule,
  ],
})
export class ProfileModule { }
