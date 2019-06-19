import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatBadgeModule, MatButtonModule } from '@angular/material';
import { NavbarNotificationsComponent } from './navbar-notifications.component';
import { MomentModule } from 'angular2-moment';

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
