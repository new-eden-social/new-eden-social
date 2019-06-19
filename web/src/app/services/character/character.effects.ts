import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ApiService } from '../api.service';
import { DCharacter } from './character.dto';
import { Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/internal/operators';
import { Observable } from 'rxjs/Rx';
import { CharacterActionTypes, LoadCharacter, LoadSuccess } from './character.actions';
import { Exception } from '../api.actions';
import { of } from 'rxjs/index';

@Injectable()
export class CharacterEffects extends ApiService {

  private uri = 'characters';

  @Effect()
  load$: Observable<LoadSuccess | Exception> = this.actions$.pipe(
    ofType<LoadCharacter>(CharacterActionTypes.LOAD),
    switchMap(action =>
      this.request<DCharacter>('GET', `${this.uri}/${action.payload}`).pipe(
        map(data => new LoadSuccess(data)),
        catchError(error => of(new Exception(error)))
      ),
    ),
  );
}
