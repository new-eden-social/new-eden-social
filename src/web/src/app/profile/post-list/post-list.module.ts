import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list.component';
import { LoadingModule } from '../../loading/loading.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PostListModule } from '../../post-list/post-list.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    InfiniteScrollModule,
    PostListModule,
    RouterModule,
    LoadingModule,
  ],
  declarations: [PostListComponent]
})
export class ProfilePostListModule { }
