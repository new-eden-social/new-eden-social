import { Injectable } from '@angular/core';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../api.service';
import { DAlliance } from './alliance.dto';
import { Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';
import { AllianceActionTypes, LoadAlliance, LoadSuccess } from './alliance.actions';
import { catchError, map, mergeMap, switchMap } from 'rxjs/internal/operators';
import { Exception } from '../api.actions';
import { of } from 'rxjs/index';

@Injectable()
export class AllianceEffects extends ApiService {

  private uri = 'alliances';

  @Effect()
  load$: Observable<LoadSuccess | Exception> = this.actions$.pipe(
    ofType<LoadAlliance>(AllianceActionTypes.LOAD),
    switchMap(action =>
      this.request<DAlliance>('GET', `${this.uri}/${action.payload}`).pipe(
        map(data => new LoadSuccess(data)),
        catchError(error => of(new Exception(error)))
      ),
    ),
  );

}
