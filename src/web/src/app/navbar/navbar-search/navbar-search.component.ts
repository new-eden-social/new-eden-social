import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../app.store';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs/internal/operators';
import { Clear, Search } from '../../services/search/search.actions';
import { DSearchName } from '../../services/search/search.dto';
import { Categories } from '../../services/esi.interface';

@Component({
  selector: 'app-navbar-search',
  templateUrl: './navbar-search.component.html',
  styleUrls: ['./navbar-search.component.scss'],
})
export class NavbarSearchComponent implements OnInit {

  names$: Observable<DSearchName[]>;

  characters: Observable<DSearchName[]>;
  showCharacters: Observable<boolean>;

  corporations: Observable<DSearchName[]>;
  showCorporations: Observable<boolean>;

  alliances: Observable<DSearchName[]>;
  showAlliances: Observable<boolean>;

  searchCtrl = new FormControl();

  searchHover = false;
  searchFocus = false;

  private limit = 5;

  constructor(
    private store: Store<IAppState>,
    private router: Router,
  ) {
    this.names$ = this.store.pipe(select('search', 'data', 'names'));

    this.searchCtrl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(query => {
      if (query.length > 2) {
        this.store.dispatch(new Search(query));
      } else if (this.showCharacters || this.showCorporations || this.showAlliances) {
        this.store.dispatch(new Clear());
      }
    });

    this.characters = this.names$.pipe(
      map(characters => characters
        .filter(name => name.category === Categories.character)
        .splice(0, this.limit),
      ),
    );
    this.showCharacters = this.characters.pipe(
      map(characters => !!characters.length),
    );

    this.corporations = this.names$.pipe(
      map(corporation => corporation
        .filter(name => name.category === Categories.corporation)
        .splice(0, this.limit),
      ),
    );
    this.showCorporations = this.corporations.pipe(
      map(corporations => !!corporations.length),
    );

    this.alliances = this.names$.pipe(
      map(alliances => alliances
        .filter(name => name.category === Categories.alliance)
        .splice(0, this.limit),
      ),
    );
    this.showAlliances = this.alliances.pipe(
      map(alliances => !!alliances.length),
    );
  }

  ngOnInit() {
  }

  leftSearch() {
    this.searchHover = false;
  }

  enterSearch() {
    this.searchHover = true;
  }

  toggleBlur() {
    this.searchFocus = false;
    this.searchCtrl.setValue('');
  }

  toggleFocus() {
    this.searchFocus = true;
  }
}
