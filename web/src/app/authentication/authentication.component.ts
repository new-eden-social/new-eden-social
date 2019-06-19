import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../app.store';
import {
  AuthenticateCallback,
  AuthenticateCheck,
} from '../services/authentication/authentication.actions';
import { filter, map, mergeMap, tap } from 'rxjs/internal/operators';

@Component({
  selector: 'app-authentication',
  template: `
    <div class="align-center">
      <h1>Please wait while we are processing authentication request</h1>
      <mat-progress-spinner
        color="primary"
        mode="indeterminate">
      </mat-progress-spinner>
    </div>
  `,
  styles: [`
    .align-center {
      display: flex;
      flex-direction: column;
    }

    .align-center h1 {
      font-weight: 300;
    }

    .align-center * {
      align-self: center;
    }
  `],
})
export class AuthenticationComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<IAppState>,
  ) {

    // When authenticated, redirect to home
    this.store.pipe(
      select('authentication', 'authenticated'),
      filter(authenticated => authenticated),
    ).subscribe(() => this.router.navigate(['']));
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const accessToken = params['access_token'];
      const refreshToken = params['refresh_token'];
      const expiresIn = params['expires_in'];
      const tokenType = params['token_type'];

      this.store.dispatch(new AuthenticateCallback({
        accessToken,
        tokenType,
        expiresIn,
        refreshToken,
      }));
    });
  }

}
