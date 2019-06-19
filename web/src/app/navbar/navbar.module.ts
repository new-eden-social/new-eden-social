import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';
import { NavbarSearchModule } from './navbar-search/navbar-search.module';
import {
  MatButtonModule, MatIconModule, MatMenuModule,
  MatToolbarModule,
} from '@angular/material';
import { NavbarNotificationsModule } from './navbar-notifications/navbar-notifications.module';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatMenuModule,
    NavbarSearchModule,
    NavbarNotificationsModule,
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
})
export class NavbarModule {
}
