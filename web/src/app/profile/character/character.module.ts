import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterComponent } from './character.component';
import { MatButtonModule, MatCardModule, MatListModule } from '@angular/material';
import { PostFormModule } from '../../post-form/post-form.module';
import { PostModule } from '../../post/post.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FooterModule } from '../../footer/footer.module';
import { RouterModule } from '@angular/router';
import { ProfileHeaderModule } from '../header/header.module';
import { LoadingModule } from '../../loading/loading.module';
import { PostListModule } from '../../post-list/post-list.module';

@NgModule({
  imports: [
    CommonModule,
    FooterModule,
    ProfileHeaderModule,
    RouterModule,
    LoadingModule,
    MatButtonModule,
  ],
  declarations: [CharacterComponent],
  exports: [CharacterComponent],
})
export class CharacterModule {
}
