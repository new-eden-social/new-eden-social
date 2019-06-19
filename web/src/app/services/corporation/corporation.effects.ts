import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ApiService } from '../api.service';
import { DCorporation } from './corporation.dto';
import { Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/internal/operators';
import { Observable } from 'rxjs/Rx';
import { CorporationActionTypes, LoadCorporation, LoadSuccess } from './corporaiton.actions';
import { Exception } from '../api.actions';
import { of } from 'rxjs/index';

@Injectable()
export class CorporationEffects extends ApiService {

  private uri = 'corporations';

  @Effect()
  load$: Observable<LoadSuccess | Exception> = this.actions$.pipe(
    ofType<LoadCorporation>(CorporationActionTypes.LOAD),
    switchMap(action =>
      this.request<DCorporation>('GET', `${this.uri}/${action.payload}`).pipe(
        map(data => new LoadSuccess(data)),
        catchError(error => of(new Exception(error))),
      ),
    ),
  );
}
