import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
// tslint:disable-next-line: use-component-view-encapsulation
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {

  @Input()
  image?: string;

  @Input()
  title?: string;

  @Input()
  handle?: string;

  @Input()
  type?: string;

  @Input()
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
