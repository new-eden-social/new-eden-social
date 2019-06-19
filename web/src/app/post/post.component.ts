import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DPost } from '../services/post/post.dto';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';
import { DComment, DCommentList } from '../services/comment/comment.dto';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../app.store';
import { Latest } from '../services/comment/comment.actions';
import { PostService } from '../services/post/post.service';
import { getCommentListKey } from '../services/comment/comment.constants';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostComponent implements OnInit {

  @Input()
  post: DPost;

  @Input()
  showCommentForm = true;

  comments$: Observable<DCommentList>;
  comments: DComment[] = [];
  moreComments = false;
  commentsPage = 0;
  commentsPerPage = 3;

  author: {
    name: string;
    link: any[];
    handle: string;
    image: string;
  } = { name: null, link: [], handle: null, image: null };
  wall: {
    name: string;
    link: any[];
    handle: string;
    image: string;
  };

  content: string | SafeHtml;

  constructor(
    private store: Store<IAppState>,
    private router: Router,
    private sanitizer: DomSanitizer,
    public postService: PostService,
  ) {
  }

  ngOnInit() {
    this.author = this.postService.getAuthor(this.post);
    this.wall = this.postService.getWall(this.post);

    // get initial comments
    this.store.dispatch(new Latest({
      postId: this.post.id,
      page: this.commentsPage,
      limit: this.commentsPerPage,
    }));

    this.comments$ = this.store.pipe(select('comment', 'list', getCommentListKey(this.post.id)));

    // subscribe on comments
    this.comments$.subscribe((comments) => {
      if (!comments) return;

      this.comments = comments.data;
      this.moreComments = comments.page < (comments.pages - 1);
    });

    const html = this.post.content.replace(
      /#(\w*[0-9a-zA-Z]+\w*[0-9a-zA-Z])/g,
      (hashtag) =>
        `<a href="/hashtag/${hashtag.replace('#', '')}" class="text-link">${hashtag}</a>`);

    this.content = this.sanitizer.bypassSecurityTrustHtml(html);
  }

  loadMoreComments() {
    // load comments
    this.commentsPage++;
    this.store.dispatch(new Latest({
      postId: this.post.id,
      page: this.commentsPage,
      limit: this.commentsPerPage,
    }));
  }
}
