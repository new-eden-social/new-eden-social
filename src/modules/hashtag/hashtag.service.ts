import { Injectable } from '@nestjs/common';
import { Hashtag } from './hashtag.entity';
import { HashtagRepository } from './hashtag.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HashtagService {

  constructor(
    @InjectRepository(HashtagRepository)
    private hashtagRepository: HashtagRepository,
  ) {
  }

  /**
   * Parse text and create (if not exists) hashtags
   * @param {string} text
   * @returns {Promise<Hashtag[]>}
   */
  public async parse(text: string): Promise<Hashtag[]> {
    const hashtags = text.match(/(#\w+)/g) || [];
    const unique = hashtags.reduce(
      (unique, name) => {
        const trimName = name.replace('#', '');
        if (unique.indexOf(trimName) !== -1) return unique;
        return [...unique, trimName];
      },
      []);

    const hashtagEntities = unique.map(name => new Hashtag(name));

    return this.hashtagRepository.save(hashtagEntities);
  }

}
