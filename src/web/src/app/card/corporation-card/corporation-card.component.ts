import {Component, Input, OnInit} from '@angular/core';
import {DCorporation, DCorporationShort} from '../../services/corporation/corporation.dto';

@Component({
  selector: 'app-corporation-card',
  templateUrl: './corporation-card.component.html',
  styleUrls: ['./corporation-card.component.scss']
})
export class CorporationCardComponent implements OnInit {

  @Input()
  corporation: DCorporationShort|DCorporation;

  constructor() { }

  ngOnInit() {
  }

}
