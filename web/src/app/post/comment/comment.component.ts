import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DComment } from '../../services/comment/comment.dto';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CommentComponent implements OnInit {

  @Input('comment')
  comment: DComment;

  name: string;
  link: any[];
  handle: string;
  image: string;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
  ) {
  }

  ngOnInit() {
    if (this.comment.character) {
      this.name = this.comment.character.name;
      this.handle = this.comment.character.handle;
      this.link = ['/character', this.comment.character.id];
      this.image = this.comment.character.portrait.px64x64;
    }
    if (this.comment.corporation) {
      this.name = this.comment.corporation.name;
      this.handle = this.comment.corporation.handle;
      this.link = ['/corporation', this.comment.corporation.id];
      this.image = this.comment.corporation.icon.px64x64;
    }
    if (this.comment.alliance) {
      this.name = this.comment.alliance.name;
      this.handle = this.comment.alliance.handle;
      this.link = ['/alliance', this.comment.alliance.id];
      this.image = this.comment.alliance.icon.px64x64;
    }
  }

  openItem() {
    this.router.navigate(this.link);
  }
}
