import { Component, Input, OnInit } from '@angular/core';
import { DCharacter } from '../services/character/character.dto';
import { DCorporation } from '../services/corporation/corporation.dto';
import { DAlliance } from '../services/alliance/alliance.dto';
import { DPostList } from '../services/post/post.dto';
import { Observable } from 'rxjs/Observable';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../app.store';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {

  @Input()
  characterWall: DCharacter;

  @Input()
  corporationWall: DCorporation;

  @Input()
  allianceWall: DAlliance;

  @Input()
  postList: DPostList;

  @Input()
  showForm = true;

  @Input()
  showCommentForm = true;

  @Input()
  showEnding = true;

  authenticated$: Observable<boolean>;

  constructor(
    private store: Store<IAppState>,
  ) {
    this.authenticated$ = this.store.pipe(select('authentication', 'authenticated'));
  }

  ngOnInit() {
  }

}
