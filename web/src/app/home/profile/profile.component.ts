import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {DCharacter, DCharacterShort} from '../../services/character/character.dto';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../app.store';

@Component({
  selector: 'app-home-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class HomeProfileComponent implements OnInit {

  authenticatedCharacter$: Observable<DCharacterShort>;
  character$: Observable<DCharacter>;

  constructor(
    private store: Store<IAppState>,
  ) {
    this.authenticatedCharacter$ = this.store.pipe(select('authentication', 'character'));
    this.authenticatedCharacter$.subscribe(authenticatedCharacter => {
      this.character$ = this.store.pipe(select('character', 'single', `${authenticatedCharacter.id}`));
    })
  }

  ngOnInit() {
  }

}
