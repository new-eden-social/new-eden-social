import { LoggerInstance } from 'winston';
import { Component, Inject } from '@nestjs/common';
import { LOGGER_LEVEL, LOGGER_WINSTON_PROVIDER } from './logger.constants';

@Component()
export class LoggerService {

  constructor(@Inject(LOGGER_WINSTON_PROVIDER) private winston: LoggerInstance) {
  }

  public log(level: LOGGER_LEVEL, msg: string, ...meta): void {
    this.winston.log(level, msg, ...meta);
  }

  public debug(msg: string, ...meta): void {
    this.winston.debug(msg, ...meta);
  }

  public error(msg: string, ...meta): void {
    this.winston.error(msg, ...meta);
  }

  public warning(msg: string, ...meta): void {
    this.winston.warn(msg, ...meta);
  }

  public info(msg: string, ...meta): void {
    this.winston.info(msg, ...meta);
  }

  public silly(msg: string, ...meta): void {
    this.winston.silly(msg, ...meta);
  }
}
