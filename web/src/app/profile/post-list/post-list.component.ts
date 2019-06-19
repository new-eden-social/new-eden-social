import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/index';
import { DPostList } from '../../services/post/post.dto';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { IAppState } from '../../app.store';
import {
  GetAllianceWall, GetCharacterWall,
  GetCorporationWall,
} from '../../services/post/post.actions';
import { DCharacter } from '../../services/character/character.dto';
import { DCorporation } from '../../services/corporation/corporation.dto';
import { DAlliance } from '../../services/alliance/alliance.dto';
import {
  SubscribeToAllianceWall,
  SubscribeToCharacterWall, SubscribeToCorporationWall,
} from '../../services/websocket/websocket.actions';
import { filter } from 'rxjs/internal/operators';
import {
  getPostListKeyForAllianceWall,
  getPostListKeyForCharacterWall,
  getPostListKeyForCorporationWall,
} from '../../services/post/post.constants';

@Component({
  selector: 'app-profile-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit, OnDestroy {

  websocketConnected$: Observable<boolean>;

  entity$: Observable<DCharacter | DCorporation | DAlliance>;
  wall$: Observable<DPostList>;
  page = 0;
  entityId: string;
  entityType: 'character' | 'corporation' | 'alliance';

  constructor(
    private store: Store<IAppState>,
    private route: ActivatedRoute,
  ) {
    this.websocketConnected$ = this.store.pipe(select('websocket', 'connected'));
  }

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.entityId = this.route.parent.snapshot.paramMap.get('id');
      this.entityType = <'character' | 'corporation' | 'alliance'>this.route.snapshot.data.entity;

      const wallKey = this.getWallKeyForType(this.entityType, this.entityId);
      this.wall$ = this.store.pipe(select('post', 'list', wallKey));
      this.entity$ = this.store.pipe(select(this.entityType, 'single', this.entityId));

      this.loadWallForType(this.entityType);
      this.websocketConnected$.pipe(
        filter(connected => connected),
      ).subscribe(() => {
        this.subscribeForType(this.entityType);
      });
    });
  }

  ngOnDestroy(): void {
    this.websocketConnected$.pipe(
      filter(connected => connected),
    ).subscribe(() => {
      this.unSubscribeForType(this.entityType);
    });
  }

  unSubscribeForType(type: 'character' | 'corporation' | 'alliance') {
    switch (type) {
      case 'character':
        this.store.dispatch(new SubscribeToCharacterWall({
          characterId: this.entityId,
        }));
        break;
      case 'corporation':
        this.store.dispatch(new SubscribeToCorporationWall({
          corporationId: this.entityId,
        }));
        break;
      case 'alliance':
        this.store.dispatch(new SubscribeToAllianceWall({
          allianceId: this.entityId,
        }));
        break;
    }
  }

  subscribeForType(type: 'character' | 'corporation' | 'alliance') {
    switch (type) {
      case 'character':
        this.store.dispatch(new SubscribeToCharacterWall({
          characterId: this.entityId,
        }));
        break;
      case 'corporation':
        this.store.dispatch(new SubscribeToCorporationWall({
          corporationId: this.entityId,
        }));
        break;
      case 'alliance':
        this.store.dispatch(new SubscribeToAllianceWall({
          allianceId: this.entityId,
        }));
        break;
    }
  }

  loadWallForType(type: 'character' | 'corporation' | 'alliance') {
    switch (type) {
      case 'character':
        this.store.dispatch(new GetCharacterWall({
          characterId: this.entityId,
          page: this.page,
          limit: 20,
        }));
        break;
      case 'corporation':
        this.store.dispatch(new GetCorporationWall({
          corporationId: this.entityId,
          page: this.page,
          limit: 20,
        }));
        break;
      case 'alliance':
        this.store.dispatch(new GetAllianceWall({
          allianceId: this.entityId,
          page: this.page,
          limit: 20,
        }));
        break;
    }
  }

  onScroll() {
    this.page++;
    this.loadWallForType(this.entityType);
  }

  private getWallKeyForType(type: 'character' | 'corporation' | 'alliance', entityId: string|number) {
    switch (type) {
      case 'character':
        return getPostListKeyForCharacterWall(entityId);
      case 'corporation':
        return getPostListKeyForCorporationWall(entityId);
      case 'alliance':
        return getPostListKeyForAllianceWall(entityId);
    }
  }

}
