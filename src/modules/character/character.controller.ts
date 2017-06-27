import { Response, Param, Controller, Get, Post, Body, HttpStatus } from '@nestjs/common';
import { CharactersService } from './character.service';
import { Character } from './character.entety';

@Controller('characters')
export class CharactersController {

  constructor(private characterService: CharactersService) {
  }

}
