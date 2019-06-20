import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeProfileModule } from './profile/profile.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HomeWelcomeModule } from './welcome/welcome.module';
import { PostModule } from '../post/post.module';
import { PostFormModule } from '../post-form/post-form.module';
import { RouterModule } from '@angular/router';
import { FooterModule } from '../footer/footer.module';
import { PostListModule } from '../post-list/post-list.module';
import { LoadingModule } from '../loading/loading.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatListModule,
    InfiniteScrollModule,
    PostModule,
    PostFormModule,
    HomeProfileModule,
    HomeWelcomeModule,
    RouterModule,
    FooterModule,
    PostListModule,
    LoadingModule,
  ],
  providers: [],
  declarations: [HomeComponent],
})
export class HomeModule {
}
