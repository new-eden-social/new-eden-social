import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAppState } from '../../app.store';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/index';
import { DCharacter } from '../../services/character/character.dto';
import { DCorporation } from '../../services/corporation/corporation.dto';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class DescriptionComponent implements OnInit {

  entity$: Observable<DCharacter | DCorporation>;

  entityId: string;
  entityType: 'character' | 'corporation' | 'alliance';

  descriptionHtml: string;

  constructor(
    private store: Store<IAppState>,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.entityId = this.route.parent.snapshot.paramMap.get('id');
      this.entityType = <'character' | 'corporation'>this.route.snapshot.data.entity;

      this.entity$ = this.store.pipe(select(this.entityType, 'single', this.entityId));
    });

    this.entity$.subscribe(entity => {
      let html = entity.description;

      html = html.replace(/size="\d+"/g, (substring) => {
        const size = substring.replace('size="', '').replace('"', '');
        return `class="font-size-${size}"`
      });
      // html = html.replace(//g, '&nbsp;');
      html = html.replace(/color="#([A-Fa-f0-9]){8,9}"/g, (substring) => {
        const argb = substring.replace('color="#', '').replace('"', '');
        const rgb = argb.slice(2); // Take away the A
        return `color="#${rgb}"`
      });

      html = html.replace(/<a/g, '<span').replace(/\/a>/g, '/span>');

      this.descriptionHtml = html;
    })
  }

}
