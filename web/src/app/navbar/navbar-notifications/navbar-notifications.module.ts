import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarNotificationsComponent } from './navbar-notifications.component';
import { MomentModule } from 'angular2-moment';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatBadgeModule,
    MomentModule,
  ],
  declarations: [NavbarNotificationsComponent],
  exports: [NavbarNotificationsComponent],
})
export class NavbarNotificationsModule {
}
