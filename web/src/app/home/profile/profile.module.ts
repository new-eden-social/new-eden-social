import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeProfileComponent } from './profile.component';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import {LoadingModule} from '../../loading/loading.module';

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
