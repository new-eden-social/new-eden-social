import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DPostList } from '../services/post/post.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { PostEffects } from '../services/post/post.effects';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../app.store';
import { GetHashtag } from '../services/post/post.actions';
import {
  SubscribeToHashtagWall, UnSubscribeFromHashtagWall,
} from '../services/websocket/websocket.actions';
import { filter } from 'rxjs/internal/operators';

@Component({
  selector: 'app-hashtag',
  templateUrl: './hashtag.component.html',
  styleUrls: ['./hashtag.component.scss'],
})
export class HashtagComponent implements OnInit, OnDestroy {

  authenticated$: Observable<boolean>;
  websocketConnected$: Observable<boolean>;

  wall$: Observable<DPostList>;

  page: number = 0;
  hashtag: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostEffects,
    private store: Store<IAppState>,
  ) {
    this.authenticated$ = this.store.pipe(select('authentication', 'authenticated'));
    this.websocketConnected$ = this.store.pipe(select('websocket', 'connected'));
  }

  ngOnDestroy() {
    this.websocketConnected$.pipe(
      filter(connected => connected),
    ).subscribe(() => {
      this.store.dispatch(new UnSubscribeFromHashtagWall({ hashtag: this.hashtag }));
    });
  }

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.page = 0;
      this.hashtag = this.route.snapshot.params['hashtag'];
      this.wall$ = this.store.pipe(select('post', 'list', `hashtag:${this.hashtag}`));
      this.store.dispatch(new GetHashtag({
        hashtag: this.hashtag,
        page: this.page,
        limit: 20,
      }));

      this.websocketConnected$.pipe(
        filter(connected => connected),
      ).subscribe(() => {
        this.store.dispatch(new SubscribeToHashtagWall({ hashtag: this.hashtag }));
      });
    });
  }

  onScroll() {
    this.page++;
    this.store.dispatch(new GetHashtag({ hashtag: this.hashtag, page: this.page, limit: 20 }));
  }
}
