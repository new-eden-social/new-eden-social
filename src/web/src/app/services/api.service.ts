import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Actions } from '@ngrx/effects';
import { IAppState } from '../app.store';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/internal/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  protected apiUrl = (environment as any).apiEndpoint;

  constructor(
    protected http: HttpClient,
    protected actions$: Actions,
    protected store: Store<IAppState>,
    protected router: Router,
    protected snackBar: MatSnackBar,
  ) {
  }

  public request<T = any>(
    method: string,
    url: string,
    config: any = {},
  ): Observable<T> {
    url = this.apiUrl + url;

    return this.http.request<T>(method, url, {
      ...config,
      responseType: 'json',
      observe: 'response',
    })
    .pipe(
      map(response => (response as HttpResponse<T>).body),
    );
  }
}
