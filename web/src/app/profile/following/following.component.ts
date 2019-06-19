import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {IAppState} from '../../app.store';
import {DFollow} from '../../services/follow/follow.dto';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit {

  following: DFollow[] = [];

  entityId: string;
  entityType: 'character';

  constructor(
    private store: Store<IAppState>,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.entityId = this.route.parent.snapshot.paramMap.get('id');
      this.entityType = <'character'>this.route.snapshot.data.entity;

      this.store.pipe(select(this.entityType, 'single', this.entityId))
        .subscribe(entity => this.following = entity.following);
    });
  }

}
