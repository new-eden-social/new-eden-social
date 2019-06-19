import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DCorporation } from '../../services/corporation/corporation.dto';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../app.store';
import { LoadCorporation } from '../../services/corporation/corporaiton.actions';
import {FollowCharacter, FollowCorporation} from '../../services/follow/follow.actions';

@Component({
  selector: 'app-corporation',
  templateUrl: './corporation.component.html',
  styleUrls: ['./corporation.component.scss'],
})
export class CorporationComponent implements OnInit {

  authenticated$: Observable<boolean>;
  authenticatedCharacterId$: Observable<number>;
  authenticatedCharacterId: number;

  corporation: DCorporation;

  allianceName: string;
  allianceId: number;

  constructor(
    private store: Store<IAppState>,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.authenticated$ = this.store.pipe(select('authentication', 'authenticated'));
    this.authenticatedCharacterId$ = this.store.pipe(select('authentication', 'character', 'id'));

    this.route.params.subscribe(() => {
      const id = this.route.snapshot.paramMap.get('id');

      this.store.pipe(select('corporation', 'single', id))
      .subscribe(corporation => {
        this.corporation = corporation;
        if (this.corporation && this.corporation.alliance) {
          this.allianceId = this.corporation.alliance.id;
          this.allianceName = this.corporation.alliance.name;
        }
      });

      this.store.dispatch(new LoadCorporation(id));
    });

    this.authenticatedCharacterId$
      .subscribe(characterId => this.authenticatedCharacterId = characterId);
  }

  follow() {
    this.store.dispatch(new FollowCorporation({ corporationId: this.corporation.id }));
  }

  follower(): boolean {
    return !!this.corporation.followers
      .filter(follow => follow.follower.id === this.authenticatedCharacterId).length
  }
}
