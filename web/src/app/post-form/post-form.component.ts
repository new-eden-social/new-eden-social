import {
  Component, ElementRef, HostListener, Input, OnInit, ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';
import { DCharacter, DCharacterShort } from '../services/character/character.dto';
import { DCorporation } from '../services/corporation/corporation.dto';
import { DAlliance } from '../services/alliance/alliance.dto';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../app.store';
import { PostAsAlliance, PostAsCharacter, PostAsCorporation } from '../services/post/post.actions';
import { RichContentEditableComponent } from '../rich-content/rich-content-editable.component';
import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji/emoji.component';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostFormComponent implements OnInit {

  @Input()
  characterWall?: DCharacter;

  @Input()
  corporationWall?: DCorporation;

  @Input()
  allianceWall?: DAlliance;

  authenticated$: Observable<boolean>;

  character$: Observable<DCharacterShort>;
  character: DCharacterShort;

  options = {
    locationId: null,
    characterId: null,
    corporationId: null,
    allianceId: null,
  };

  postAs: 'character' | 'corporation' | 'alliance';
  postAsImage: string;
  postValue = '';

  showEmojiMart = false;

  @ViewChild(RichContentEditableComponent)
  private postForm: RichContentEditableComponent;

  @ViewChild('openEmojiMartButton')
  private openEmojiMartButton: ElementRef;

  constructor(
    private store: Store<IAppState>,
    public element: ElementRef,
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

  openEmojiMart() {
    this.showEmojiMart = true;
  }

  @HostListener('document:click', ['$event.target'])
  closeEmojiMart(target: Element) {
    const emojiMartPicker = this.element.nativeElement.querySelector('#emoji-mart-picker');
    const openEmojiMart = this.element.nativeElement.querySelector('#open-emoji-mart-picker');

    // Ignore if clicked on a open emoji mart button
    if (openEmojiMart && openEmojiMart.contains(target)) {
      return;
    }

    if (emojiMartPicker && this.showEmojiMart) {
      const contains = emojiMartPicker.contains(target);
      if (!contains) {
        this.showEmojiMart = false;
      }
    }
  }

  insertEmoji(emoji: EmojiEvent) {
    this.showEmojiMart = false;
    this.postForm.setValue(this.postValue + ' ' + emoji.emoji.colons);
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
    // Needed to know where to append the post
    let wallKey;

    // If we try to post to character wall that isn't us, we should post on a wall
    if (this.characterWall && (this.postAs !== 'character' || this.character.id !== this.characterWall.id)) {
      this.options.characterId = this.characterWall.id;
      wallKey = `character:${this.characterWall.id}`;
    } else {
      this.options.characterId = null;
      if (this.postAs === 'character')
        wallKey = `character:${this.character.id}`;
    }

    // If we try to post as corporation to own corporation wall, we shouldn't post on a wall
    if (this.corporationWall && (this.postAs !== 'corporation' || this.character.corporation.id !== this.corporationWall.id)) {
      this.options.corporationId = this.corporationWall.id;
      wallKey = `corporation:${this.corporationWall.id}`;
    } else {
      this.options.corporationId = null;
      if (this.postAs === 'corporation')
        wallKey = `corporation:${this.character.corporation.id}`;
    }

    // If we try to post as alliance and we are in alliance, on the alliance wall that is our
    // alliance we shouldn't post on a wall
    if (this.allianceWall && (this.postAs !== 'alliance' ||
        (!this.character.corporation.alliance || this.character.corporation.alliance.id !== this.allianceWall.id)
      )) {
      this.options.allianceId = this.allianceWall.id;
      wallKey = `alliance:${this.allianceWall.id}`;
    } else {
      this.options.allianceId = null;
      if (this.postAs === 'alliance')
        wallKey = `alliance:${this.character.corporation.alliance.id}`;
    }

    switch (this.postAs) {
      case 'character':
        this.store.dispatch(new PostAsCharacter({
          wallKey,
          content: this.postValue,
          type: 'TEXT',
          options: this.options,
        }));
        break;
      case 'corporation':
        this.store.dispatch(new PostAsCorporation({
          wallKey,
          content: this.postValue,
          type: 'TEXT',
          options: this.options,
        }));
        break;
      case 'alliance':
        this.store.dispatch(new PostAsAlliance({
          wallKey,
          content: this.postValue,
          type: 'TEXT',
          options: this.options,
        }));
        break;
    }
    // TODO: We could wait for feedback, if error do not reset
    this.postForm.clear();
  }
}
