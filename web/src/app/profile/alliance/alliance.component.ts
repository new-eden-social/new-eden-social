import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DAlliance } from '../../services/alliance/alliance.dto';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../app.store';
import { LoadAlliance } from '../../services/alliance/alliance.actions';
import { FollowAlliance } from '../../services/follow/follow.actions';

@Component({
  selector: 'app-alliance',
  templateUrl: './alliance.component.html',
  styleUrls: ['./alliance.component.scss'],
})
export class AllianceComponent implements OnInit {

  authenticated$: Observable<boolean>;
  authenticatedCharacterId$: Observable<number>;
  authenticatedCharacterId: number;

  alliance: DAlliance;

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

      this.store.pipe(select('alliance', 'single', id))
      .subscribe(alliance => {
        this.alliance = alliance;
      });

      this.store.dispatch(new LoadAlliance(id));
    });

    this.authenticatedCharacterId$
      .subscribe(characterId => this.authenticatedCharacterId = characterId);
  }

  follow() {
    this.store.dispatch(new FollowAlliance({ allianceId: this.alliance.id }));
  }

  follower(): boolean {
    return !!this.alliance.followers
      .filter(follow => follow.follower.id === this.authenticatedCharacterId).length
  }
}
