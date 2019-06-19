import {Component, Input, OnInit} from '@angular/core';
import {DCharacter, DCharacterShort} from '../../services/character/character.dto';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit {

  @Input()
  character: DCharacterShort|DCharacter;

  constructor() { }

  ngOnInit() {
  }

}
