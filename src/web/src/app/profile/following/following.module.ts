import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowingComponent } from './following.component';
import {CharacterCardModule} from '../../card/character-card/character-card.module';
import {CorporationCardModule} from '../../card/corporation-card/corporation-card.module';
import {AllianceCardModule} from '../../card/alliance-card/alliance-card.module';

@NgModule({
  imports: [
    CommonModule,
    CharacterCardModule,
    CorporationCardModule,
    AllianceCardModule,
  ],
  declarations: [FollowingComponent]
})
export class FollowingModule { }
