import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import {LoadingModule} from '../../loading/loading.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
    LoadingModule,
  ],
  exports: [HomeProfileComponent],
  declarations: [HomeProfileComponent],
  providers: [],
})
export class HomeProfileModule {
}
