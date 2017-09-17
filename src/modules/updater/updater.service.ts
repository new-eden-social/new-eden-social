import { Component, Inject } from '@nestjs/common';
import { CharactersService } from '../character/character.service';
import { Character } from '../character/character.entity';
import { CHARACTER_REPOSITORY_TOKEN } from '../character/character.constants';
import { Repository } from 'typeorm';

@Component()
export class UpdaterService {

  private readonly LOOP_INTERVAL = 60000; // 10min timeout
  private readonly UPDATE_INTERVAL = '1 day';

  constructor(
    @Inject(CHARACTER_REPOSITORY_TOKEN) private characterRepository: Repository<Character>,
    private characterService: CharactersService,
  ) {
    this.loop();
    setInterval(this.loop.bind(this), this.LOOP_INTERVAL);
  }

  /**
   * Update Characters
   * @return {Promise<void>}
   */
  private async updateCharacters(): Promise<void> {
    const idsStream = await this.characterRepository
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
