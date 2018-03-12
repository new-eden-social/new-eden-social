import { createHash } from 'crypto';
// tslint:disable-next-line:variable-name
const Hashids = require('hashids');

export class Utils {

  /**
   * Create hash from parameters
   * @param args
   * @return {Promise<string>}
   */
  public static async hash(...args): Promise<string> {
    const sha = createHash('sha1');
    sha.update(JSON.stringify(args));

    return sha.digest('hex');
  }

  private static initHashids() {
    return new Hashids('eve-book', 5, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890');
  }

  /**
   * Encode Hashids from values
   * @param args
   * @return {string}
   */
  public static hashidsEncode(...args: number[]): string {
    return this.initHashids().encode(args);
  }

  /**
   * Decode Hashids from value
   * @param hash
   * @return {string}
   */
  public static hashidsDecode(hash: string): number[] {
    return this.initHashids().decode(hash);
  }

  /**
   * Create handle for id and name combination
   * @param id
   * @param name
   * @return {string}
   */
  public static createHandle(id, name): string {
    const handleId = Utils.hashidsEncode(id);
    const handleName = name.replace(/\s/g, '_');
    return `${handleName}#${handleId}`;
  }
}
