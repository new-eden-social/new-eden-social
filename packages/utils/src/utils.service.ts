import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
// tslint:disable-next-line: variable-name
// tslint:disable-next-line: no-var-requires
const Hashids = require('hashids');

@Injectable()
export class UtilsService {

  private readonly hashids;

  constructor() {
    this.hashids = new Hashids(
      'eve-book',
      5,
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
    );
  }

  /**
   * Create hash from parameters
   * @param args
   * @return {Promise<string>}
   */
  public async hash(...args): Promise<string> {
    const sha = createHash('sha1');
    sha.update(JSON.stringify(args));

    return sha.digest('hex');
  }

  /**
   * Encode Hashids from values
   * @param args
   * @return {string}
   */
  public hashidsEncode(...args: number[]): string {
    return this.hashids.encode(args);
  }

  /**
   * Decode Hashids from value
   * @param hash
   * @return {string}
   */
  public hashidsDecode(hash: string): number[] {
    return this.hashids.decode(hash);
  }

  /**
   * Create handle for id and name combination
   * @param id
   * @param name
   * @return {string}
   */
  public createHandle(id, name): string {
    const handleId = this.hashidsEncode(id);
    const handleName = name.replace(/\s/g, '_');
    return `${handleName}#${handleId}`;
  }

}
