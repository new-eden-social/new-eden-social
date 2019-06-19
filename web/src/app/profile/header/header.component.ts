import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {

  @Input('image')
  image?: string;

  @Input('title')
  title?: string;

  @Input('handle')
  handle?: string;

  @Input('type')
  type?: string;

  @Input('subheader')
  subheader?: {
    link: string,
    text: string,
  };

  zkillboardUrl: string;

  constructor(
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.url.subscribe(([entity, id]) => {
      this.zkillboardUrl = `//zkillboard.com/${entity}/${id}/`;
    });
  }

}
