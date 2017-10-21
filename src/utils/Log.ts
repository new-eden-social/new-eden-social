import { Logger, LoggerInstance, transports } from 'winston';

export default class Log {

  private static winston: LoggerInstance;
  private static initDone = false;
  private static transports = [
    new transports.Console({
      colorize: true,
      align: true,
      level: process.env.LOG_LEVEL,
    }),
  ];

  /**
   * Initialize Logger (should be called only once!)
   */
  public static init(): void {
    if (!Log.initDone) {
      Log.initDone = true;

      console.log(Log.transports);
      Log.winston = new Logger({
        level: process.env.LOG_LEVEL,
        transports: Log.transports,
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
