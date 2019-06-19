import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowersComponent } from './followers.component';
import {CharacterCardModule} from '../../card/character-card/character-card.module';

@NgModule({
  imports: [
    CommonModule,
    CharacterCardModule,
  ],
  declarations: [FollowersComponent]
})
export class FollowersModule { }
