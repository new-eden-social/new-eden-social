import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from './app.store';
import {filter, take} from 'rxjs/internal/operators';
import { Connect } from './services/websocket/websocket.actions';
import { Load } from './services/notification/notification.actions';
import {LoadCharacter} from './services/character/character.actions';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar id="header"></app-navbar>

    <!-- main content -->
    <div id="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {

  constructor(
    public store: Store<IAppState>,
  ) {
  }

  ngOnInit(): void {
    console.log('Trying to initially connect to websocket');
    this.store.dispatch(new Connect());

    // Initially we check if we are authenticated, if we are, we try to establish connection
    this.store.pipe(
      select('authentication'),
      filter(authentication => authentication.authenticated),
    ).subscribe(authentication => {
      console.log('Trying to initially get notifications');
      this.store.dispatch(new Load({ limit: 100, page: 0 }));
      console.log('Trying to initially get character');
      this.store.dispatch(new LoadCharacter(authentication.character.id));
    });
  }
}
