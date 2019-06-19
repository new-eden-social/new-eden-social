import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ApiService } from '../api.service';
import { Effect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map } from 'rxjs/internal/operators';
import { Observable } from 'rxjs/Rx';
import { Exception } from '../api.actions';
import { of } from 'rxjs/index';
import {FollowActionTypes, FollowAlliance, FollowCharacter, FollowCorporation, FollowSuccess} from './follow.actions';
import {DFollowAction} from './follow.dto';

@Injectable()
export class FollowEffects extends ApiService {

  private uri = 'follow';

  @Effect()
  followCharacter$: Observable<FollowSuccess | Exception> = this.actions$.pipe(
    ofType<FollowCharacter>(FollowActionTypes.FOLLOW_CHARACTER),
    concatMap(({ payload }) =>
      this.request<DFollowAction>('POST', `${this.uri}/character/${payload.characterId}`)
      .pipe(
        map(follow => new FollowSuccess({ follow })),
        catchError(error => of(new Exception(error))),
      )
    ),
  );

  @Effect()
  followCorporation$: Observable<FollowSuccess | Exception> = this.actions$.pipe(
    ofType<FollowCorporation>(FollowActionTypes.FOLLOW_CORPORATION),
    concatMap(({ payload }) =>
      this.request<DFollowAction>('POST', `${this.uri}/corporation/${payload.corporationId}`)
        .pipe(
          map(follow => new FollowSuccess({ follow })),
          catchError(error => of(new Exception(error))),
        )
    ),
  );

  @Effect()
  followAlliance$: Observable<FollowSuccess | Exception> = this.actions$.pipe(
    ofType<FollowAlliance>(FollowActionTypes.FOLLOW_ALLIANCE),
    concatMap(({ payload }) =>
      this.request<DFollowAction>('POST', `${this.uri}/alliance/${payload.allianceId}`)
        .pipe(
          map(follow => new FollowSuccess({ follow })),
          catchError(error => of(new Exception(error))),
        )
    ),
  );
}
