import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllianceCardComponent } from './alliance-card.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [AllianceCardComponent],
  exports: [
    AllianceCardComponent,
  ]
})
export class AllianceCardModule { }
