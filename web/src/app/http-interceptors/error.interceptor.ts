import { Injectable } from '@angular/core';
import { IAppState } from '../app.store';
import { select, Store } from '@ngrx/store';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { filter, map, mergeMap, retryWhen } from 'rxjs/internal/operators';
import { Observable } from 'rxjs/Rx';
import { RefreshToken } from '../services/authentication/authentication.actions';
import { ApiExceptionResponse } from '../services/api.interface';
import { API_EXCEPTIONS } from '../services/exceptions.constants';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  refreshToken: string;

  constructor(
    private store: Store<IAppState>,
    protected snackBar: MatSnackBar,
  ) {
    this.store.pipe(
      select('authentication', 'data', 'refreshToken'),
    ).subscribe(token => this.refreshToken = token);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      retryWhen((error: Observable<HttpErrorResponse>) => {
        return error.pipe(
          mergeMap((error: HttpErrorResponse) => {
            const body = <ApiExceptionResponse>error.error;
            if (this.refreshToken
              && error.status === 401
              && body.error === API_EXCEPTIONS.CHARACTER_NOT_AUTHENTICATED) {
              this.store.dispatch(new RefreshToken(this.refreshToken));
              return this.store.pipe(
                select('authentication', 'data', 'refreshToken'),
                filter(token => token != this.refreshToken),
              );
            }
            throw error;
          }),
        );
      }),
    );
  }
}
