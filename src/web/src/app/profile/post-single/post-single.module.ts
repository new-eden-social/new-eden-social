import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostSingleComponent } from './post-single.component';
import { PostModule } from '../../post/post.module';
import { LoadingModule } from '../../loading/loading.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    PostModule,
    RouterModule,
    LoadingModule,
  ],
  declarations: [PostSingleComponent]
})
export class ProfilePostSingleModule { }
