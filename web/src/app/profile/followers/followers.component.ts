import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {IAppState} from '../../app.store';
import {ActivatedRoute} from '@angular/router';
import {DFollow} from '../../services/follow/follow.dto';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {

  followers: DFollow[] = [];

  entityId: string;
  entityType: 'character' | 'corporation' | 'alliance';

  constructor(
    private store: Store<IAppState>,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.entityId = this.route.parent.snapshot.paramMap.get('id');
      this.entityType = <'character' | 'corporation' | 'alliance'>this.route.snapshot.data.entity;

      this.store.pipe(select(this.entityType, 'single', this.entityId))
        .subscribe(entity => this.followers = entity.followers);
    });
  }

}
