import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../app.store';
import { DNotification, DNotificationList } from '../../services/notification/notification.dto';
import { Observable, of } from 'rxjs/index';
import { filter, map, tap } from 'rxjs/internal/operators';
import { SeenNotification } from '../../services/notification/notification.actions';
import * as moment from 'moment';
import { NotificationService } from '../../services/notification/notification.service';
import { PostService } from '../../services/post/post.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar-notifications',
  templateUrl: './navbar-notifications.component.html',
  styleUrls: ['./navbar-notifications.component.scss'],
})
export class NavbarNotificationsComponent implements OnInit {

  notifications$: Observable<DNotificationList>;
  newNotifications$: Observable<DNotification[]> = of([]);
  otherNotifications$: Observable<DNotification[]> = of([]);

  notificationsHover: boolean = false;
  notificationsToggle: boolean = false;

  constructor(
    private store: Store<IAppState>,
    private router: Router,
    private title: Title,
    public notificationService: NotificationService,
    public postService: PostService,
  ) {
    this.notifications$ = this.store.pipe(select('notification', 'list'));
  }

  ngOnInit() {
    this.newNotifications$ = this.notifications$.pipe(
      map(notificationsData => notificationsData ? notificationsData.data : []),
      map(notifications => notifications.filter(notification => {
        return !notification.seenAt &&
          // Not older than 2 days
          moment(notification.createdAt).isAfter(moment().subtract(2, 'day'));
      })),
    );
    this.otherNotifications$ = this.notifications$.pipe(
      map(notificationsData => notificationsData ? notificationsData.data : []),
      map(notifications => notifications.filter(notification => {
        return notification.seenAt ||
          // Not younger than 2 days
          moment(notification.createdAt).isBefore(moment().subtract(2, 'day'));
      })),
    );
    this.newNotifications$.pipe(
      map(notifications => notifications.length),
    ).subscribe(notifications => {
      const title = this.title.getTitle().replace(/^\(\d+\)/g, '');
      if (notifications > 0) this.title.setTitle(`(${notifications}) ${title}`);
      else this.title.setTitle(title);
    });
  }

  openNotification(notification: DNotification) {
    if (!notification.seenAt) {
      this.store.dispatch(new SeenNotification(notification.id));
    }

    if (notification.post) {
      this.router.navigate(this.postService.getPostLink(notification.post));
    } else if (notification.senderCharacter) {
      this.router.navigate(['character', notification.senderCharacter.id]);
    } else if (notification.senderCorporation) {
      this.router.navigate(['corporation', notification.senderCorporation.id])
    } else if (notification.senderAlliance) {
      this.router.navigate(['alliance', notification.senderAlliance.id])
    }
  }

  leftNotifications() {
    this.notificationsHover = false;
  }

  enterNotifications() {
    this.notificationsHover = true;
  }

  toggleBlur() {
    this.notificationsToggle = false;
  }

  toggleFocus() {
    this.notificationsToggle = true;
  }

}
