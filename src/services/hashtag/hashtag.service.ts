import { Injectable } from '@nestjs/common';
import { Hashtag } from '@new-eden-social/services-hashtag/hashtag.entity';
import { HashtagRepository } from '@new-eden-social/services-hashtag/hashtag.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HashtagService {

  constructor(
    @InjectRepository(HashtagRepository)
    private readonly hashtagRepository: HashtagRepository,
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
      (_unique, name) => {
        const trimName = name.replace('#', '');
        if (_unique.indexOf(trimName) !== -1) { return _unique; }
        return [..._unique, trimName];
      },
      []);

    const hashtagEntities = unique.map(name => new Hashtag(name));

    return this.hashtagRepository.save(hashtagEntities);
  }

}
