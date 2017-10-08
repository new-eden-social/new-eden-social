import { Component, Inject } from '@nestjs/common';
import { CharactersService } from '../character/character.service';
import { Character } from '../character/character.entity';
import { CHARACTER_REPOSITORY_TOKEN } from '../character/character.constants';
import { Repository } from 'typeorm';
import Log from '../../utils/Log';

@Component()
export class UpdaterService {

  private readonly LOOP_INTERVAL = 60000; // 1min timeout
  private readonly UPDATE_INTERVAL = '1 day';
  private readonly UPDATE_LIMIT = 100;

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
    .where(`"updatedAt" < (NOW() - interval '${this.UPDATE_INTERVAL}')`)
    .limit(this.UPDATE_LIMIT)
    .stream();

    idsStream.on('error', (err) => {
      throw err;
    });

    idsStream.on('data', ({ id }) => {
      this.characterService.get(id)
      .then(character => this.characterService.update(character));
    });
  }

  /**
   * Main Loop
   */
  private loop(): void {
    this.updateCharacters()
    .then(() => {
      Log.debug('Update loop done');
    });
  }

}
