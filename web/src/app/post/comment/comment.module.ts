import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment.component';
import { MomentModule } from 'angular2-moment';
import { RouterModule } from '@angular/router';
import { RichContentModule } from '../../rich-content/rich-content.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MomentModule,
    RouterModule,
    RichContentModule,
  ],
  declarations: [CommentComponent],
  exports: [CommentComponent],
})
export class CommentModule {
}
