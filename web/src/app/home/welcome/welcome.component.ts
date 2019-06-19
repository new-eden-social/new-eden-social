import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GetLatest } from '../../services/post/post.actions';
import { IAppState } from '../../app.store';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/index';
import { DPostList } from '../../services/post/post.dto';
import { filter } from 'rxjs/internal/operators';
import {
  SubscribeToLatestWall,
  UnSubscribeFromLatestWall,
} from '../../services/websocket/websocket.actions';

@Component({
  selector: 'app-home-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class HomeWelcomeComponent implements OnInit, OnDestroy {

  postList$: Observable<DPostList>;

  authenticationUrl = (<any>environment).apiEndpoint;
  websocketConnected$: Observable<boolean>;

  page = 0;

  constructor(
    private store: Store<IAppState>,
  ) {
    this.postList$ = this.store.pipe(select('post', 'list', 'latest'));
    this.websocketConnected$ = this.store.pipe(select('websocket', 'connected'));
  }

  ngOnInit() {
    this.page = 0;
    this.store.dispatch(new GetLatest({ page: this.page, limit: 5 }));

    this.websocketConnected$.pipe(
      filter(connected => connected),
    ).subscribe(() => {
      this.store.dispatch(new SubscribeToLatestWall());
    });
  }

  ngOnDestroy() {
    this.websocketConnected$.pipe(
      filter(connected => connected),
    ).subscribe(() => {
      this.store.dispatch(new UnSubscribeFromLatestWall());
    });
  }

  onScroll() {
    this.page++;
    this.store.dispatch(new GetLatest({ page: this.page, limit: 20 }));
  }
}
