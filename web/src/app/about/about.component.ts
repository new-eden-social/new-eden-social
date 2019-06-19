import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../app.store';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/internal/operators';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {

  currentPage: Observable<string>;

  constructor(
    private store: Store<IAppState>,
  ) {
  }

  ngOnInit() {
    this.currentPage = this.store.pipe(
      select('router', 'state', 'url'),
      map(url => url.split('/').find((_, i, a) => i === a.length - 1)),
    );
  }

}
