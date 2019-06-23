import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorporationCardComponent } from './corporation-card.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [CorporationCardComponent],
  exports: [
    CorporationCardComponent,
  ]
})
export class CorporationCardModule { }
