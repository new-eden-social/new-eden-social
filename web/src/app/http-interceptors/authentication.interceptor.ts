import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { IAppState } from '../app.store';
import { select, Store } from '@ngrx/store';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  accessToken: string;

  constructor(
    private store: Store<IAppState>,
  ) {
    this.store.pipe(
      select('authentication', 'data', 'accessToken'),
    ).subscribe(token => this.accessToken = token);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + this.accessToken),
    });

    return next.handle(authReq)
  }

}
