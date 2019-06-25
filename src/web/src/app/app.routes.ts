import { HomeComponent } from './home/home.component';
import { CharacterComponent } from './profile/character/character.component';
import { CorporationComponent } from './profile/corporation/corporation.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AllianceComponent } from './profile/alliance/alliance.component';
import { HashtagComponent } from './hashtag/hashtag.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PostListComponent } from './profile/post-list/post-list.component';
import { PostSingleComponent } from './profile/post-single/post-single.component';
import { AboutComponent } from './about/about.component';
import { LegalComponent } from './about/legal/legal.component';
import { EvebookComponent } from './about/evebook/evebook.component';
import { ApiComponent } from './about/api/api.component';
import { OtherPartiesComponent } from './about/other-parties/other-parties.component';
import { Routes } from '@angular/router';
import { DonationsComponent } from './about/donations/donations.component';
import { DescriptionComponent } from './profile/description/description.component';
import {FollowersComponent} from './profile/followers/followers.component';
import {FollowingComponent} from './profile/following/following.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hashtag/:hashtag', component: HashtagComponent },
  {
    path: 'character/:id',
    component: CharacterComponent,
    children: [
      { path: '', component: PostListComponent, data: { entity: 'character' } },
      { path: 'post/:postId', component: PostSingleComponent, data: { entity: 'character' } },
      { path: 'description', component: DescriptionComponent, data: { entity: 'character' } },
      { path: 'followers', component: FollowersComponent, data: { entity: 'character' } },
      { path: 'following', component: FollowingComponent, data: { entity: 'character' } },
    ],
  },
  {
    path: 'corporation/:id',
    component: CorporationComponent,
    children: [
      { path: '', component: PostListComponent, data: { entity: 'corporation' } },
      { path: 'post/:postId', component: PostSingleComponent, data: { entity: 'corporation' } },
      { path: 'description', component: DescriptionComponent, data: { entity: 'corporation' } },
      { path: 'followers', component: FollowersComponent, data: { entity: 'corporation' } },
    ],
  },
  {
    path: 'alliance/:id',
    component: AllianceComponent,
    children: [
      { path: '', component: PostListComponent, data: { entity: 'alliance' } },
      { path: 'post/:postId', component: PostSingleComponent, data: { entity: 'alliance' } },
      { path: 'description', component: DescriptionComponent, data: { entity: 'alliance' } },
      { path: 'followers', component: FollowersComponent, data: { entity: 'alliance' } },
    ],
  },
  { path: 'authentication/callback', component: AuthenticationComponent },
  {
    path: 'about',
    component: AboutComponent,
    children: [
      { path: '', redirectTo: 'evebook', pathMatch: 'full' },
      { path: 'evebook', component: EvebookComponent },
      { path: 'api', component: ApiComponent },
      { path: 'legal', component: LegalComponent },
      { path: '3th-parties', component: OtherPartiesComponent },
      { path: 'donations', component: DonationsComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];
