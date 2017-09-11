import { Component } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CharactersService } from '../character/character.service';
import { IGetCharacter } from '../external/esi/esi.interface';
import { Character } from '../character/character.entity';

@Component()
export class ImporterService {

  // 10min timeout
  timeout: 60000;

  constructor(
    private databaseService: DatabaseService,
    private characterService: CharactersService,
  ) {
    this.loop();
  }

  /**
   * Create Character
   * @param {ESI.IGetCharacter} characterData
   * @return {Promise<Character>}
   */
  private async createCharacter(characterData: IGetCharacter): Promise<Character> {
    const character = new Character();
    character.populateESI(characterData);
    return this.characterService.createCharacter(character);
  }

  private async importNewCharacters(): Promise<void> {
    const lastCharId = await (await this.databaseService.getRepository(Character))
    .createQueryBuilder('character')
    .select('id')
    .orderBy({ id: 'DESC' })
    .limit(1)
    .getOne() || 0;

    console.log(lastCharId);
  }

  /**
   * Importing loop
   */
  private loop(): void {
    console.info('loop');
    this.importNewCharacters();
  }

}
