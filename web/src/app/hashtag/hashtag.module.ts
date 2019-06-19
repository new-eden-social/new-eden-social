import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HashtagComponent } from './hashtag.component';
import { LoadingModule } from '../loading/loading.module';
import { PostListModule } from '../post-list/post-list.module';
import { FooterModule } from '../footer/footer.module';
import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    LoadingModule,
    PostListModule,
    FooterModule,
    MatButtonModule,
  ],
  declarations: [HashtagComponent],
  exports: [HashtagComponent],
})
export class HashtagModule {
}
