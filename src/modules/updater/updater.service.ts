import { Component } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CharactersService } from '../character/character.service';
import { Character } from '../character/character.entity';

@Component()
export class UpdaterService {

  // 10min timeout
  private readonly INTERVAL = 60000;
  private readonly UPDATE_INTERVAL = '1 day';

  constructor(
    private databaseService: DatabaseService,
    private characterService: CharactersService,
  ) {
    this.loop();
    setInterval(this.loop.bind(this), this.INTERVAL);
  }

  /**
   * Update Characters
   * @return {Promise<void>}
   */
  private async updateCharacters(): Promise<void> {
    const idsStream = await (await this.databaseService.getRepository(Character))
    .createQueryBuilder('character')
    .select('id')
    .where(
      `"updatedAt" < (NOW() - interval :updateInterval)`,
      { updateInterval: this.UPDATE_INTERVAL },
    )
    .stream();

    idsStream.on('data', ({ id }) => this.characterService.update(id));
  }

  /**
   * Main Loop
   */
  private loop(): void {
    this.updateCharacters()
    .then(() => {
      console.log('loop done');
    });
  }

}
