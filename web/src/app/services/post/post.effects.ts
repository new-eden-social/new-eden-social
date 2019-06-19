import { Injectable } from '@angular/core';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../api.service';
import { DPost, DPostList } from './post.dto';
import { Effect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, switchMap } from 'rxjs/internal/operators';
import { Observable } from 'rxjs/Rx';
import {
  GetAllianceWall,
  GetCharacterWall, GetCorporationWall, GetHashtag, GetLatest, GetSuccess, LoadPost, LoadSuccess,
  PostActionTypes, PostAsAlliance, PostAsCharacter, PostAsCorporation, PostSuccess,
} from './post.actions';
import { Exception } from '../api.actions';
import { of } from 'rxjs/index';
import {
  getPostListKeyForAllianceWall, getPostListKeyForCharacterWall,
  getPostListKeyForCorporationWall, getPostListKeyForHashtagWall, getPostListKeyForLatestWall,
} from './post.constants';

@Injectable()
export class PostEffects extends ApiService {

  private uri = 'posts';

  @Effect()
  load$: Observable<LoadSuccess | Exception> = this.actions$.pipe(
    ofType<LoadPost>(PostActionTypes.LOAD),
    switchMap(({ payload }) => this.request<DPost>(
      'GET',
      `${this.uri}/${payload.postId}`).pipe(
      map(post => new LoadSuccess({ post })),
      catchError(error => of(new Exception(error))),
      ),
    ));

  @Effect()
  latest$: Observable<GetSuccess | Exception> = this.actions$.pipe(
    ofType<GetLatest>(PostActionTypes.GET_LATEST),
    switchMap(({ payload }) =>
      this.request<DPostList>(
        'GET',
        `${this.uri}/latest?page=${payload.page}&limit=${payload.limit}`).pipe(
        map(posts => new GetSuccess({
          posts,
          key: getPostListKeyForLatestWall(),
        })),
        catchError(error => of(new Exception(error))),
      ),
    ));

  @Effect()
  hashtag$: Observable<GetSuccess | Exception> = this.actions$.pipe(
    ofType<GetHashtag>(PostActionTypes.GET_HASHTAG),
    switchMap(({ payload }) =>
      this.request<DPostList>(
        'GET',
        `${this.uri}/hashtag/${payload.hashtag}?page=${payload.page}&limit=${payload.limit}`).pipe(
        map(posts => new GetSuccess({
          posts,
          key: getPostListKeyForHashtagWall(payload.hashtag),
        })),
        catchError(error => of(new Exception(error))),
      ),
    ));

  @Effect()
  characterWall$: Observable<GetSuccess | Exception> = this.actions$.pipe(
    ofType<GetCharacterWall>(PostActionTypes.GET_CHARACTER_WALL),
    switchMap(({ payload }) =>
      this.request<DPostList>(
        'GET',
        `${this.uri}/character/${payload.characterId}?page=${payload.page}&limit=${payload.limit}`)
      .pipe(
        map(posts => new GetSuccess({
          posts,
          key: getPostListKeyForCharacterWall(payload.characterId),
        })),
        catchError(error => of(new Exception(error))),
      ),
    ));

  @Effect()
  corporationWall$: Observable<GetSuccess | Exception> = this.actions$.pipe(
    ofType<GetCorporationWall>(PostActionTypes.GET_CORPORATION_WALL),
    switchMap(({ payload }) =>
      this.request<DPostList>(
        'GET',
        `${this.uri}/corporation/${payload.corporationId}?page=${payload.page}&limit=${payload.limit}`)
      .pipe(
        map(posts => new GetSuccess({
          posts,
          key: getPostListKeyForCorporationWall(payload.corporationId),
        })),
        catchError(error => of(new Exception(error))),
      ),
    ));

  @Effect()
  allianceWall$: Observable<GetSuccess | Exception> = this.actions$.pipe(
    ofType<GetAllianceWall>(PostActionTypes.GET_ALLIANCE_WALL),
    switchMap(({ payload }) =>
      this.request<DPostList>(
        'GET',
        `${this.uri}/alliance/${payload.allianceId}?page=${payload.page}&limit=${payload.limit}`)
      .pipe(
        map(posts => new GetSuccess({
          posts,
          key: getPostListKeyForAllianceWall(payload.allianceId),
        })),
        catchError(error => of(new Exception(error))),
      ),
    ));


  @Effect()
  post$: Observable<PostSuccess | Exception> = this.actions$.pipe(
    ofType<PostAsCharacter | PostAsCorporation | PostAsAlliance>(
      PostActionTypes.POST_AS_CHARACTER,
      PostActionTypes.POST_AS_CORPORATION,
      PostActionTypes.POST_AS_ALLIANCE),
    concatMap(({ payload, type }) => {
        if (!payload.options) payload.options = {};

        let path;
        switch (type) {
          case PostActionTypes.POST_AS_CHARACTER:
            path = 'character';
            break;
          case PostActionTypes.POST_AS_CORPORATION:
            path = 'corporation';
            break;
          case PostActionTypes.POST_AS_ALLIANCE:
            path = 'alliance';
            break;
        }

        return this.request<DPost>('POST', `${this.uri}/${path}`, {
          body: {
            content: payload.content,
            type: payload.type,
            locationId: payload.options.locationId,
            corporationId: payload.options.corporationId,
            allianceId: payload.options.allianceId,
            characterId: payload.options.characterId,
          },
        }).pipe(
          map(post => new PostSuccess()),
          catchError(error => of(new Exception(error))),
        );
      },
    ),
  );
}
