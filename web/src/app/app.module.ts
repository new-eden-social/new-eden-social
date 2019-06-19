import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule, MatSnackBarModule } from '@angular/material';
import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { NavbarModule } from './navbar/navbar.module';
import { HomeModule } from './home/home.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { effects, metaReducers, reducers } from './app.store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { httpInterceptorProviders } from './http-interceptors';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';
import {TransferHttpCacheModule} from '@nguniversal/common';
import { ProfileModule } from './profile/profile.module';
import { AboutModule } from './about/about.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    // Connects RouterModule with StoreModule
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router', // name of reducer key
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    BrowserModule.withServerTransition({appId: 'my-app'}),
    TransferHttpCacheModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    NavbarModule,
    HomeModule,
    ProfileModule,
    AuthenticationModule,
    HashtagModule,
    MatSnackBarModule,
    PageNotFoundModule,
    AboutModule,
  ],
  providers: [
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
