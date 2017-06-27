import { Component } from '@nestjs/common';
import { IService } from '../../interfaces/service.interface';
import { DatabaseService } from '../database/database.service';
import { Repository } from 'typeorm';
import { Character } from './character.entety';

@Component()
export class CharactersService implements IService<Character> {

  constructor(private databaseService: DatabaseService) {
  }

  private get repository(): Promise<Repository<Character>> {
    return this.databaseService.getRepository(Character);
  }
}
