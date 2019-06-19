import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { LoadPost } from '../../services/post/post.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { IAppState } from '../../app.store';
import { Observable } from 'rxjs/index';
import { DPost } from '../../services/post/post.dto';
import {
  SubscribeToPostComments, UnSubscribeFromPostComments,
} from '../../services/websocket/websocket.actions';
import { filter } from 'rxjs/internal/operators';

@Component({
  selector: 'app-profile-post-single',
  templateUrl: './post-single.component.html',
  styleUrls: ['./post-single.component.scss'],
})
export class PostSingleComponent implements OnInit, OnDestroy {

  websocketConnected$: Observable<boolean>;

  post$: Observable<DPost>;
  entityId: string;
  postId: string;
  entityType: 'character' | 'corporation' | 'alliance';

  constructor(
    private store: Store<IAppState>,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.websocketConnected$ = this.store.pipe(select('websocket', 'connected'));
  }

  ngOnDestroy() {
    this.websocketConnected$.pipe(
      filter(connected => connected)
    ).subscribe(() => {
      this.store.dispatch(new UnSubscribeFromPostComments({
        postId: this.postId,
      }));
    });
  }

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.entityId = this.route.parent.snapshot.paramMap.get('id');
      this.entityType = <'character' | 'corporation' | 'alliance'>this.route.snapshot.data.entity;

      this.postId = this.route.snapshot.paramMap.get('postId');
      this.post$ = this.store.pipe(select('post', 'single', this.postId));
      this.store.dispatch(new LoadPost({ postId: this.postId }));

      this.websocketConnected$.pipe(
        filter(connected => connected),
      ).subscribe(() => {
        this.store.dispatch(new SubscribeToPostComments({
          postId: this.postId,
        }));
      });
    });
  }

  closeSpecificPost(event) {
    if (event.target.id === 'specific-post-wrap') {
      this.router.navigate([this.entityType, this.entityId]);
    }
  }
}
