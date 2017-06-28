import { createHash } from 'crypto';
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

}