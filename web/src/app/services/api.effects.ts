import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material';
import { map } from 'rxjs/internal/operators';
import { Observable } from 'rxjs/Rx';
import { ApiActionTypes, Exception, ExceptionProcessed } from './api.actions';

@Injectable()
export class ApiEffects {

  @Effect()
  exception$: Observable<ExceptionProcessed> = this.actions$.pipe(
    ofType<Exception>(ApiActionTypes.EXCEPTION),
    map(action => {
      this.showSnackBar(action.payload.message);
      return new ExceptionProcessed(action.payload);
    }),
  );

  constructor(
    private actions$: Actions,
    private snackBar: MatSnackBar,
  ) {
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, null, { duration: 6000 });
  }
}
