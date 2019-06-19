import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list.component';
import { PostFormModule } from '../post-form/post-form.module';
import { PostModule } from '../post/post.module';
import { MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    PostFormModule,
    PostModule,
    MatCardModule,
  ],
  declarations: [PostListComponent],
  exports: [PostListComponent],
})
export class PostListModule {
}
