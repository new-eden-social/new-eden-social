import {Component, Input, OnInit} from '@angular/core';
import {DAlliance, DAllianceShort} from '../../services/alliance/alliance.dto';

@Component({
  selector: 'app-alliance-card',
  templateUrl: './alliance-card.component.html',
  styleUrls: ['./alliance-card.component.scss']
})
export class AllianceCardComponent implements OnInit {

  @Input()
  alliance: DAllianceShort|DAlliance;

  constructor() { }

  ngOnInit() {
  }

}
