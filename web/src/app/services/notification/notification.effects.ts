import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material';
import { Actions, Effect, ofType, } from '@ngrx/effects';
import { IAppState } from '../../app.store';
import { EMPTY, fromEvent, of } from 'rxjs/index';
import { WS_NOTIFICATION_EVENT, WS_NOTIFICATION_SEEN_EVENT } from './notification.constant';
import {
  Load, LoadSuccess, NewNotification,
  NotificationsActionTypes, SeenNotification, SeenNotificationUpdate,
} from './notification.actions';
import { catchError, filter, map, mergeMap, switchMap } from 'rxjs/internal/operators';
import { WebsocketEffects } from '../websocket/websocket.effects';
import { Observable } from 'rxjs/Rx';
import { DNotification, DNotificationList } from './notification.dto';
import { ApiService } from '../api.service';
import { Exception } from '../api.actions';
import { NotificationService } from './notification.service';

@Injectable()
export class NotificationEffects {

  private uri = 'notifications';

  @Effect()
  load$: Observable<LoadSuccess | Exception> = this.actions$.pipe(
    ofType<Load>(NotificationsActionTypes.LOAD),
    switchMap(({ payload }) =>
      this.apiService.request<DNotificationList>(
        'GET',
        `${this.uri}/latest?page=${payload.page}&limit=${payload.limit}`).pipe(
        map(data => new LoadSuccess(data)),
        catchError(error => of(new Exception(error))),
      ),
    ),
  );

  @Effect()
  seenNotification$: Observable<null | Exception> = this.actions$.pipe(
    ofType<SeenNotification>(NotificationsActionTypes.SEEN_NOTIFICATION),
    switchMap(({ payload }) =>
      this.apiService.request<void>(
        'POST',
        `${this.uri}/${payload}/seen`).pipe(
        mergeMap(() => EMPTY),
        catchError(error => of(new Exception(error))),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private store: Store<IAppState>,
    private snackBar: MatSnackBar,
    private websocketEffects: WebsocketEffects,
    private apiService: ApiService,
    private notificationService: NotificationService,
  ) {
    this.listenForNotifications();
  }

  private listenForNotifications() {
    // Wait until we are authenticated to subscribe on notifications events
    this.store.pipe(
      select('websocket', 'authenticated'),
      filter(authenticated => authenticated),
    )
    .subscribe(authenticated => {
      fromEvent<DNotification>(this.websocketEffects.socket, WS_NOTIFICATION_EVENT)
      .subscribe(notification => {
        this.showSnackBar(this.notificationService.getText(notification));
        this.store.dispatch(new NewNotification(notification));
      });

      fromEvent<DNotification>(this.websocketEffects.socket, WS_NOTIFICATION_SEEN_EVENT)
      .subscribe(notification => {
        this.store.dispatch(new SeenNotificationUpdate(notification));
      });
    });
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, null, { duration: 2500 });
  }

}
