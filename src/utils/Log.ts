import { Logger, LoggerInstance, transports } from 'winston';

export default class Log {

  private static winston: LoggerInstance;
  private static initDone = false;

  /**
   * Initialize Logger (should be called only once!)
   */
  public static init(): void {
    if (!Log.initDone) {
      Log.initDone = true;

      Log.winston = new Logger({
        transports: [
          new transports.Console({
            level: process.env.LOG_LEVEL,
            colorize: true,
          }),
        ],
      });
    }
  }

  public static log(level: string, msg: string, ...meta): void {
    Log.winston.log(level, msg, ...meta);
  }

  public static error(msg: string, ...meta): void {
    Log.winston.error(msg, ...meta);
  }

  public static warning(msg: string, ...meta): void {
    Log.winston.warning(msg, ...meta);
  }

  public static info(msg: string, ...meta): void {
    Log.winston.info(msg, ...meta);
  }

  public static debug(msg: string, ...meta): void {
    Log.winston.debug(msg, ...meta);
  }

  public static silly(msg: string, ...meta): void {
    Log.winston.silly(msg, ...meta);
  }

}
