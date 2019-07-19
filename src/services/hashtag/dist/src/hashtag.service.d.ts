import { Hashtag } from './hashtag.entity';
import { HashtagRepository } from './hashtag.repository';
export declare class HashtagService {
    private readonly hashtagRepository;
    constructor(hashtagRepository: HashtagRepository);
    /**
     * Parse text and create (if not exists) hashtags
     * @param {string} text
     * @returns {Promise<Hashtag[]>}
     */
    parse(text: string): Promise<Hashtag[]>;
}
