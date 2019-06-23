import { Injectable, Inject } from '@nestjs/common';
import { LOGGER_LEVEL, LOGGER_WINSTON_PROVIDER } from './logger.constants';
import { Logger } from 'winston';

@Injectable()
export class LoggerService {

  constructor(@Inject(LOGGER_WINSTON_PROVIDER) private logger: Logger) {
  }

  public log(level: LOGGER_LEVEL, msg: string, ...meta): void {
    this.logger.log(level, msg, ...meta);
  }

  public debug(msg: string, ...meta): void {
    this.logger.debug(msg, ...meta);
  }

  public error(msg: string, ...meta): void {
    this.logger.error(msg, ...meta);
  }

  public warning(msg: string, ...meta): void {
    this.logger.warn(msg, ...meta);
  }

  public info(msg: string, ...meta): void {
    this.logger.info(msg, ...meta);
  }

  public silly(msg: string, ...meta): void {
    this.logger.silly(msg, ...meta);
  }
}
