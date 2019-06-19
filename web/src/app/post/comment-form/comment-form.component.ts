import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { DCharacterShort } from '../../services/character/character.dto';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../app.store';
import {
  PostAsAlliance, PostAsCharacter,
  PostAsCorporation,
} from '../../services/comment/comment.actions';
import { SubscribeToPostComments } from '../../services/websocket/websocket.actions';
import { RichContentEditableComponent } from '../../rich-content/rich-content-editable.component';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CommentFormComponent implements OnInit {

  @Input('postId')
  postId: string;

  @ViewChild(RichContentEditableComponent)
  private commentForm: RichContentEditableComponent;

  authenticated$: Observable<boolean>;

  subscribedToComments = false;

  character$: Observable<DCharacterShort>;
  character: DCharacterShort;

  postAs: 'character' | 'corporation' | 'alliance';
  postAsImage: string;
  postValue: string = '';

  constructor(
    private store: Store<IAppState>,
  ) {
    this.authenticated$ = this.store.pipe(select('authentication', 'authenticated'));
    this.character$ = this.store.pipe(select('authentication', 'character'));
  }

  ngOnInit() {
    this.character$.subscribe(character => {
      this.character = character;
      if (this.character) this.setCharacter();
    });
  }

  writing(value: string) {
    this.postValue = value;
  }

  setCharacter() {
    this.postAs = 'character';
    this.postAsImage = this.character.portrait.px64x64;
  }

  setCorporation() {
    this.postAs = 'corporation';
    this.postAsImage = this.character.corporation.icon.px64x64;
  }

  setAlliance() {
    this.postAs = 'alliance';
    this.postAsImage = this.character.corporation.alliance.icon.px64x64;
  }

  submit() {
    if (!this.subscribedToComments) {
      this.subscribedToComments = true;
      this.store.dispatch(new SubscribeToPostComments({ postId: this.postId }));
    }

    switch (this.postAs) {
      case 'character':
        this.store.dispatch(new PostAsCharacter({ postId: this.postId, content: this.postValue }));
        break;
      case 'corporation':
        this.store.dispatch(new PostAsCorporation({
          postId: this.postId,
          content: this.postValue,
        }));
        break;
      case 'alliance':
        this.store.dispatch(new PostAsAlliance({ postId: this.postId, content: this.postValue }));
        break;
    }
    this.commentForm.clear();
  }
}
