import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';
import { MomentModule } from 'angular2-moment';
import { CommentModule } from './comment/comment.module';
import { CommentFormModule } from './comment-form/comment-form.module';
import { RichContentModule } from '../rich-content/rich-content.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MomentModule,
    MatIconModule,

    CommentModule,
    CommentFormModule,
    RichContentModule,
  ],
  declarations: [PostComponent],
  exports: [PostComponent],
})
export class PostModule {
}
