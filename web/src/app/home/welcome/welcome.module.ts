import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeWelcomeComponent } from './welcome.component';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { PostListModule } from '../../post-list/post-list.module';
import { LoadingModule } from '../../loading/loading.module';
import {FooterModule} from '../../footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    PostListModule,
    LoadingModule,
    FooterModule,
  ],
  exports: [HomeWelcomeComponent],
  declarations: [HomeWelcomeComponent],
})
export class HomeWelcomeModule {
}
